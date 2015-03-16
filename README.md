# SlackFeels
Live retrieval of slack data and sentiment analysis

To start everything up, run `vagrant up`

The recipe has all that's required to run the code. Keep in mind that downloading the data for the sentiment analyzer can take a while.

After that, move `config.ini.demo` to `config.ini` and put there a proper [slack token](https://api.slack.com/tokens)

Finally
```
vagrant ssh
cd /slackFeels/
```
You must run 2 workers to see this functioning, one that receives the data from Slack and another that pops it from the queue and analizes it.
```
python slackPublisher.py
python slackConsumer.py
```

And as you write messages in your slack channel, you should start seeing output in the console.
