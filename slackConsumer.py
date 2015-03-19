# -*- coding: utf-8 -*-
import logging
import pika
import json
from textblob import TextBlob
from pymongo import MongoClient
import ConfigParser

LOG_FORMAT = ('%(levelname) -2s %(asctime)s -5d: %(message)s')
LOGGER = logging.getLogger(__name__)

class MessageConsumer(object):
    EXCHANGE = 'message'
    EXCHANGE_TYPE = 'topic'
    QUEUE = 'text'
    ROUTING_KEY = 'example.text'

    SETTINGS = None
    CHANNELS_INFO = None
    DB = None

    def __init__(self, amqp_url):
        self._connection = None
        self._channel = None
        self._closing = False
        self._consumer_tag = None
        self._url = amqp_url

    def connect(self):
        return pika.SelectConnection(pika.URLParameters(self._url),
                                     self.on_connection_open,
                                     stop_ioloop_on_close=False)

    def close_connection(self):
        self._connection.close()

    def add_on_connection_close_callback(self):
        self._connection.add_on_close_callback(self.on_connection_closed)

    def on_connection_closed(self, connection, reply_code, reply_text):
        self._channel = None
        LOGGER.warning('Connection closed')
        if self._closing:
            self._connection.ioloop.stop()
        else:
            self.reconnect()

    def on_connection_open(self, unused_connection):
        LOGGER.info('Connection opened')
        self.add_on_connection_close_callback()
        self.open_channel()

    def reconnect(self):
        LOGGER.info('Reconnecting')
        self._connection.ioloop.stop()

        if not self._closing:
            self._connection = self.connect()
            self._connection.ioloop.start()

    def add_on_channel_close_callback(self):
        self._channel.add_on_close_callback(self.on_channel_closed)

    def on_channel_closed(self, channel, reply_code, reply_text):
        LOGGER.warning('Channel closed: (%s) %s', reply_code, reply_text)
        self._connection.close()

    def on_channel_open(self, channel):
        LOGGER.info('Channel opened')
        self._channel = channel
        self.add_on_channel_close_callback()
        self.setup_exchange(self.EXCHANGE)

    def setup_exchange(self, exchange_name):
        self._channel.exchange_declare(self.on_exchange_declareok,
                                       exchange_name,
                                       self.EXCHANGE_TYPE)

    def on_exchange_declareok(self, unused_frame):
        self.setup_queue(self.QUEUE)

    def setup_queue(self, queue_name):
        self._channel.queue_declare(self.on_queue_declareok, queue_name)

    def on_queue_declareok(self, method_frame):
        LOGGER.info('Queue declared')
        self._channel.queue_bind(self.on_bindok, self.QUEUE,
                                 self.EXCHANGE, self.ROUTING_KEY)

    def add_on_cancel_callback(self):
        self._channel.add_on_cancel_callback(self.on_consumer_cancelled)

    def on_consumer_cancelled(self, method_frame):
        if self._channel:
            self._channel.close()

    def acknowledge_message(self, delivery_tag):
        LOGGER.info('Message with tag %i acked', delivery_tag)
        self._channel.basic_ack(delivery_tag)

    def on_message(self, unused_channel, basic_deliver, properties, body):
        self.acknowledge_message(basic_deliver.delivery_tag)
        LOGGER.info('Received message %s', body)
        self.analyzeMessage(body)

    def analyzeMessage(self, message):
        text = json.loads(message).get(u'text', None)
        channel = json.loads(message).get(u'channel', None)
        timestamp = json.loads(message).get(u'timestamp', None)
        blob = TextBlob(text)
        added_polarity = 0
        for sentence in blob.sentences:
            LOGGER.info('Sentence "%s"\'s polarity is %f', sentence, sentence.sentiment.polarity)
            added_polarity += sentence.sentiment.polarity
        self._save_channel_data({'channel_id': channel, 'polarity': added_polarity/len(blob.sentences)})
        self._save_message_info({'channel_id': channel, 'polarity': added_polarity/len(blob.sentences), 'timestamp': timestamp})


    def on_cancelok(self, unused_frame):
        self.close_channel()

    def stop_consuming(self):
        if self._channel:
            self._channel.basic_cancel(self.on_cancelok, self._consumer_tag)

    def start_consuming(self):
        LOGGER.info('Consumption started on queue %s', self.QUEUE)
        self.add_on_cancel_callback()
        self._consumer_tag = self._channel.basic_consume(self.on_message,
                                                         self.QUEUE)

    def on_bindok(self, unused_frame):
        self.start_consuming()

    def close_channel(self):
        self._channel.close()

    def open_channel(self):
        self._connection.channel(on_open_callback=self.on_channel_open)

    def run(self):
        self._connection = self.connect()
        self._connection.ioloop.start()

    def stop(self):
        self._closing = True
        self.stop_consuming()
        self._connection.ioloop.start()

    def _loadConfig(self):
        global SETTINGS, DB
        SETTINGS = ConfigParser.ConfigParser()
        SETTINGS.read('config.ini')
        DB = self._loadDB(SETTINGS)
        LOGGER.info('Settings loaded')

    def _loadDB(self, settings):
        try:
            LOGGER.info('Loading database %s:%s/%s', settings.get('db', 'host'), settings.get('db', 'port'), settings.get('db', 'name'))
            client = MongoClient(settings.get('db', 'host'), int(settings.get('db', 'port')))
            return client[settings.get('db', 'name')]
        except:
            LOGGER.error('Could not load database')
            self.stop();

    def _save_channel_data(self, data_pack):
        global SETTINGS, DB
        collection = DB.channels
        key = SETTINGS.get('organization', 'name') + ':' + data_pack.get('channel_id', 'fail_channel') + ':aggregated'
        LOGGER.info('Saving data %s into %s:%s', data_pack, SETTINGS.get('db', 'name'), 'channels')
        collection.update({ 'key': key },
            {'$inc': {'total_messages': 1, 'polarity': data_pack.get('polarity', 0.0)}}, upsert=True)

    def _save_message_info(self, data_pack):
        global SETTINGS, DB
        collection = DB.channels
        key = SETTINGS.get('organization', 'name') + ':' + data_pack.get('channel_id', 'fail_channel')
        LOGGER.info('Saving single message data: %s', json.dumps(data_pack))
        collection.insert({'key': key, 'polarity': data_pack.get('polarity', 0.0), 'timestamp': data_pack.get('timestamp', 0.0)})

def main():
    logging.basicConfig(level=logging.INFO, format=LOG_FORMAT)
    consumer = MessageConsumer('amqp://guest:guest@localhost:5672/%2F')
    try:
        consumer._loadConfig()
        consumer.run()
    except KeyboardInterrupt:
        consumer.stop()


if __name__ == '__main__':
    main()