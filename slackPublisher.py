# -*- coding: utf-8 -*-
import logging
import pika
import json
import ConfigParser
from slackclient import SlackClient
import time

LOG_FORMAT = ('%(levelname) -2s %(asctime)s -5d: %(message)s')
LOGGER = logging.getLogger(__name__)

class SlackPublisher(object):
	"""
	This class will setup a rabbitMQ Queue and publish messages received through Slack's Streaming API
	"""

	EXCHANGE = 'message'
	EXCHANGE_TYPE = 'topic'
	QUEUE = 'text'
	ROUTING_KEY = 'example.text'
	PUBLISH_INTERVAL = 1
	SLACK_TOKEN = None

	def __init__(self, amqp_url):
		self._connection = None
		self._channel = None
		self._deliveries = []
		self._acked = 0
		self._nacked = 0
		self._message_number = 0
		self._stopping = False
		self._url = amqp_url
		self._closing = False

	def connect(self):
		LOGGER.info('Connecting to %s', self._url)
		return pika.SelectConnection(pika.URLParameters(self._url),
									 self.on_connection_open,
									 stop_ioloop_on_close=False)

	def close_connection(self):
		LOGGER.info('Closing connection')
		self._closing = True
		self._connection.close()

	def on_connection_close(self, connection, reply_code, reply_text):
		self._channel = None

		if self._closing:
			self._connection.ioloop.stop()
		else:
			LOGGER.warning('Connection closed, restarting (%s) %s', reply_code, reply_text)
			self.reconnect()

	def on_connection_open(self, unused_connection):
		LOGGER.info('Connection opened')
		self._connection.add_on_close_callback(self.on_connection_close)
		self.open_channel()

	def reconnect(self):
		self._connection.ioloop.stop()
		self._connection = self.connect()
		self._connection.ioloop.start()

	def on_channel_close(self, channel, reply_code, reply_text):
		LOGGER.warning('Channel was closed: (%s) %s', reply_code, reply_text)
		if not self._closing:
			self._connection.close()

	def on_channel_open(self, channel):
		LOGGER.info('Channel opened')
		self._channel = channel
		self._channel.add_on_close_callback(self.on_channel_close)
		self.setup_exchange(self.EXCHANGE)

	def setup_exchange(self, exchange_name):
		LOGGER.info('Declaring exchange: %s', exchange_name)
		self._channel.exchange_declare(self.on_exchange_declare_ok,
										exchange_name,
										self.EXCHANGE_TYPE)

	def on_exchange_declare_ok(self, unused_frame):
		self.setup_queue(self.QUEUE)

	def setup_queue(self, queue_name):
		LOGGER.info('Declaring queue: %s', queue_name)
		self._channel.queue_declare(self.on_queue_declare_ok, queue_name)

	def on_queue_declare_ok(self, method_frame):
		LOGGER.info('Binding %s to %s with %s', self.EXCHANGE, self.QUEUE,
												self.ROUTING_KEY)
		self._channel.queue_bind(self.on_bind_ok, self.QUEUE,
								self.EXCHANGE, self.ROUTING_KEY)

	def on_delivery_confirmation(self, method_frame):
		confirmation_type = method_frame.method.NAME.split('.')[1].lower()

		LOGGER.info('Received %s for delivery tag %i', confirmation_type, 
														method_frame.method.delivery_tag)

		if confirmation_type == 'ack':
			self._acked += 1
		elif confirmation_type == 'nack':
			self._nacked += 1

		self._deliveries.remove(method_frame.method.delivery_tag)
		LOGGER.info('Published %i messages, %i have yet to be confirmed, '
					'%i were acked and %i were nacked',
					self._message_number, len(self._deliveries),
					self._acked, self._nacked)

	def enable_delivery_confirmations(self):
		self._channel.confirm_delivery(self.on_delivery_confirmation)

	def publish_message(self, message):
		if self._stopping:
			return

		properties = pika.BasicProperties(app_id='slack_publisher',
										content_type='application/json',
										headers=message)

		self._channel.basic_publish(self.EXCHANGE, self.ROUTING_KEY,
									json.dumps(message, ensure_ascii=False),
									properties)

		self._message_number += 1
		self._deliveries.append(self._message_number)
		LOGGER.info('Published message #%i with data: %s', self._message_number, json.dumps(message))

	def start_publishing(self):
		self.enable_delivery_confirmations()
		self.start_slack_communications()

	def start_slack_communications(self):
		self.loadConfig()
		sc = SlackClient(SLACK_TOKEN)

		if sc.rtm_connect():
			while True:
				messages = sc.rtm_read()
				for message in messages:
					if (message.get(u'type', None) == 'message'):
						text = message.get(u'text', None)
						if text is None:
							continue
						self.publish_message({'text': message.get(u'text', None), 
											'channel': message.get(u'channel', None), 
											'timestamp': message.get(u'ts', None)})
				time.sleep(1)
		else:
			LOGGER.ERROR('Slack connection failed with token %s', SLACK_TOKEN)
			self.stop()

	def on_bind_ok(self, unused_frame):
		LOGGER.info('Queue bound')
		self.start_publishing()

	def close_channel(self):
		LOGGER.info('Closing the channel')
		if self._channel:
			self._channel.close()

	def open_channel(self):
		LOGGER.info('Opening channel')
		self._connection.channel(on_open_callback=self.on_channel_open)

	def run(self):
		self._connection = self.connect()
		self._connection.ioloop.start()

	def stop(self):
		LOGGER.info('Stopping')
		self._stopping = True
		self.close_channel()
		self.close_connection()
		self._connection.ioloop.start()
		LOGGER.info('Stopped')

	def loadConfig(self):
		global SLACK_TOKEN
		settings = ConfigParser.ConfigParser()
		settings.read('config.ini')
		SLACK_TOKEN = settings.get('slack', 'token')

def main():
	logging.basicConfig(level=logging.INFO, format=LOG_FORMAT)	
	publisher = SlackPublisher('amqp://guest:guest@localhost:5672/%2F?connection_attempts=3&heartbeat_interval=3600')
	try:
		publisher.run()
	except KeyboardInterrupt:
		publisher.stop()

if __name__ == '__main__':
	main()