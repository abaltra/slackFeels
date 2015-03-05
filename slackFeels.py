import time
from slackclient import SlackClient
from textblob import TextBlob
import ConfigParser

SLACK_TOKEN = ''


def loadConfig():
	global SLACK_TOKEN
	settings = ConfigParser.ConfigParser()
	settings.read('config.ini')
	SLACK_TOKEN = settings.get('slack', 'token')

if __name__ == '__main__':

	loadConfig()
	print 'token is ' , SLACK_TOKEN
	sc = SlackClient(SLACK_TOKEN)

	if sc.rtm_connect():
		total_sentences = 0
		added_sentiment = 0.0
		while True:
			messages = sc.rtm_read()
			for message in messages:
				if (message.get(u'type', None) == 'message'):
					text = message.get(u'text', None)
					if text is None:
						continue
					blob = TextBlob(text)
					for sentence in blob.sentences:
						total_sentences += 1
						added_sentiment += sentence.sentiment.polarity
						print 'Sentence: ', sentence
						print (sentence.sentiment.polarity)
						print 'Added channel sentiment: ' , added_sentiment / total_sentences
						print 'Total sentences: ', total_sentences
			time.sleep(1)
	else:
		print "Connectin Failed. Wrong token?"
