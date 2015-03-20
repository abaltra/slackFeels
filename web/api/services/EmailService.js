// templates are defined in mandrill
// variables are defined with *|variable_name|*
// https://mandrillapp.com/templates/
var _ = require('lodash');
var moment = require('moment');
var mandrill = require('mandrill-api');

// TODO refactor

var EmailService = {
  userWelcome: function (to, callback) {

    //TODO not working with sails-mandrill@v0.10.2. released fix?
    // https://github.com/mikermcneil/sails-mandrill
    //Email.send({
    //  to: [{
    //    name: 'Pedro',
    //    email: 'pmpsampaio@gmail.com'
    //  }],
    //  subject: 'Slack Feels',
    //  html:
    //  'Slack Feels is so awesome!!!! ',
    //  text: 'text fallback goes here. in case some recipients can\'t receive HTML emails'
    //}, function optionalCallback (err) {
    //  console.log('err:' + JSON.stringify(err));
    //  // If you need to wait to find out if the email was sent successfully,
    //  // or run some code once you know one way or the other, here's where you can do that.
    //  // If `err` is set, the send failed.  Otherwise, we're good!
    //});

    this.send({
      email: to.email
    }, 'user_welcome', {
      content: content ? content : {},
      merge: vars ? vars : {}
    }, function(err, res){
      if(err){
        console.log('Error:' + err);
      }
      callback(err, res);
    });
  },

  userRecoverPassword: function (user, token, callback) {
    var vars = [
      {
        'name': 'name',
        'content': user.name
      },
      {
        'name': 'link',
        'token': 'http://localhost:1337/recover?t=' + token
      }
    ];

    var content = [
      {
        'name': 'recover_link',
        'content': '<a href="' + sails.config.client + '/recover?token=' + token + '">link</a>'
      }
    ];

    this.send({
      email: user.email
    }, 'user_recover_password', {
      content: content || {},
      merge: vars || {}
    }, function(err, res){
      if(err){
        console.log('Error:' + err);
      }
      callback(err, res);
    });
  },

  send: function(to, type, vars, fn) {
    var mandrill_client = new mandrill.Mandrill(sails.config.mandrill.apiKey);

    vars.merge = _.union(vars.merge || [] , [
      {
        'name': 'CURRENT_YEAR',
        'content': moment().format('YYYY')
      },
      {
        'name': 'COMPANY',
        'content': sails.config.company.name
      },
      {
        'name': 'TWITTER',
        'content': sails.config.company.twitter
      }
    ]);

    var params = {
      'template_name': type,
      'template_content': vars.content,
      'message': {
        'to': [{
          'email': to.email,
          'name': to.name
        }],
        'global_merge_vars': vars.merge,
        'merge_vars': [{
          'rcpt': to.email,
          'vars': vars.merge
        }]
      }
    };

    mandrill_client.messages.sendTemplate(params, function (res) {
      if (fn) fn(null, res);
    }, function (err) {
      if (fn) fn(err, null);
    });
  }

};

module.exports = EmailService;
