var async = require('async');
var crypto = require('crypto');
var moment = require('moment');

/**
 * Authentication Controller
 *
 * This is merely meant as an example of how your Authentication controller
 * should look. It currently includes the minimum amount of functionality for
 * the basics of Passport.js to work.
 */
var AuthController = {

  /**
   * Log out a user and return them to the homepage
   *
   * Passport exposes a logout() function on req (also aliased as logOut()) that
   * can be called from any route handler which needs to terminate a login
   * session. Invoking logout() will remove the req.user property and clear the
   * login session (if any).
   *
   * For more information on logging out users in Passport.js, check out:
   * http://passportjs.org/guide/logout/
   *
   * @param {Object} req
   * @param {Object} res
   */
  logout: function (req, res) {
    req.logout();
    res.redirect('/');
  },

  /**
   * Create a third-party authentication endpoint
   *
   * @param {Object} req
   * @param {Object} res
   */
  provider: function (req, res) {
    passport.endpoint(req, res);
  },

  /**
   * Create a authentication callback endpoint
   *
   * This endpoint handles everything related to creating and verifying Pass-
   * ports and users, both locally and from third-aprty providers.
   *
   * Passport exposes a login() function on req (also aliased as logIn()) that
   * can be used to establish a login session. When the login operation
   * completes, user will be assigned to req.user.
   *
   * For more information on logging in users in Passport.js, check out:
   * http://passportjs.org/guide/login/
   *
   * @param {Object} req
   * @param {Object} res
   */
  callback: function (req, res) {
    function tryAgain (err) {

      //// Only certain error messages are returned via req.flash('error', someError)
      //// because we shouldn't expose internal authorization errors to the user.
      //// We do return a generic error and the original request body.
      //var flashError = req.flash('error')[0];
      //
      //if (err && !flashError ) {
      //  req.flash('error', 'Error.Passport.Generic');
      //} else if (flashError) {
      //  req.flash('error', flashError);
      //}
      //req.flash('form', req.body);
      //
      //// If an error was thrown, redirect the user to the
      //// login, register or disconnect action initiator view.
      //// These views should take care of rendering the error messages.
      //var action = req.param('action');
      //
      //switch (action) {
      //  case 'register':
      //    console.log('redirect register');
      //    res.redirect('/register');
      //    break;
      //  case 'disconnect':
      //    console.log('redirect back');
      //    res.redirect('back');
      //    break;
      //  default:
      //    console.log('redirect login');
      //    res.redirect('/login');
      //}
      res.status(400).send(err);
    }


    passport.callback(req, res, function (err, user) {
      if (err) {
        console.log('Error: %s', err);
        return tryAgain();
      }

      console.log('callback');
      console.log('user:' + JSON.stringify(user));

      req.login(user, function (err) {
        if (err) {
          return tryAgain();
        }

        // Upon successful login, send the user to the homepage were req.user
        // will available.
        // Upon successful login, send the user to the homepage were req.user
        // will available.
        if(!req.param('provider') || req.param('provider') === 'local'){
          res.status(200).send(user);
        } else {
          res.redirect('/');
        }
      });
    });
  },

  /**
   * Disconnect a passport from a user
   *
   * @param {Object} req
   * @param {Object} res
   */
  disconnect: function (req, res) {
    passport.disconnect(req, res);
  }
  
};

module.exports = AuthController;
