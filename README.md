# SlackFeels
Live retrieval of slack data and sentiment analysis

To start everything up, run `vagrant up`

The recipe has all that's required to run the code. Keep in mind that downloading the data for the sentiment analyzer can take a while.

After that, move `config.ini.demo` to `config.ini` and put there a proper [slack token](https://api.slack.com/tokens)

Finally
```
vagrant ssh
cd /slackFeels/
python slackFeels.py
```

And as you write messages in your slack channel, you should start seeing output in the console.
