/**
 * StatsController
 *
 * @description :: Server-side logic for managing stats
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {


  index: function (req, res) {

    // var id = null;
    // if(req.user){
    //   id = req.user.id;
    // } else if(req.session && req.session.passport && req.session.passport.user){
    //   id = req.session.passport.user;
    // }

    // if (!id) return res.send('no id specified', 500);

    var id = '5501c73bc743d175b446d778';

    User.findOne({_id: User.mongo.objectId(id)})
    .populate('passports')
    .exec(function (err, user){
      if(err) return res.status(500).send(err);
      if(!user) return res.status(500).send('user not found');
      
      console.log('user:' + JSON.stringify(user));

      res.status(200).send(user);

    });


    var Slack = require('slack-node');
    apiToken = 'xoxp-3267723524-3266576617-4026565084-099211';

    slack = new Slack(apiToken);

    slack.api('channels.list', function(err, response) {
      Team.find({}, function(){

      })
      console.log(response);
    });

  }

};
