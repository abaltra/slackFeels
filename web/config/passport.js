/**
 * Passport configuration
 *
 * This if the configuration for your Passport.js setup and it where you'd
 * define the authentication strategies you want your application to employ.
 *
 * I have tested the service with all of the providers listed below - if you
 * come across a provider that for some reason doesn't work, feel free to open
 * an issue on GitHub.
 *
 * Also, authentication scopes can be set through the `scope` property.
 *
 * For more information on the available providers, check out:
 * http://passportjs.org/guide/providers/
 */

module.exports.passport = {
  local: {
    strategy: require('passport-local').Strategy
  },

  // twitter: {
  //   name: 'Twitter',
  //   protocol: 'oauth',
  //   strategy: require('passport-twitter').Strategy,
  //   options: {
  //     consumerKey: 'your-consumer-key',
  //     consumerSecret: 'your-consumer-secret'
  //   }
  // },

  // github: {
  //   name: 'GitHub',
  //   protocol: 'oauth2',
  //   strategy: require('passport-github').Strategy,
  //   options: {
  //     clientID: 'your-client-id',
  //     clientSecret: 'your-client-secret'
  //   }
  // },

  // facebook: {
  //   name: 'Facebook',
  //   protocol: 'oauth2',
  //   strategy: require('passport-facebook').Strategy,
  //   scope: ['email'],
  //   options: {
  //     clientID: '911226075568634',
  //     clientSecret: '2f21e12f6301623cc063daf2cd718251'
  //   }
  // },

  // google: {
  //   name: 'Google',
  //   protocol: 'oauth2',
  //   strategy: require('passport-google-oauth').OAuth2Strategy,
  //   options: {
  //     clientID: 'your-client-id',
  //     clientSecret: 'your-client-secret'
  //   }
  // }

  // instagram: {
  //   name: 'instagram',
  //   protocol: 'oauth2',
  //   strategy: require('passport-instagram').Strategy,
  //   options: {
  //     clientID: 'your-client-id',
  //     clientSecret: 'your-client-secret'
  //   }
  // }

  slack: {
    name: 'Slack',
    protocol: 'oauth2',
    strategy: require('passport-slack').Strategy,
    options: {
      clientID: '3267723524.4026467992',
      clientSecret: 'f29c63a23ddc15fe564a9b20e3afabd9'
    }
  },

};
