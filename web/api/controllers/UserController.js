/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {


  current: function (req, res) {

    var uid = null;
    if(req.user){
      uid = req.user.id;
    } else if(req.session && req.session.passport && req.session.passport.user){
      uid = req.session.passport.user;
    }

    if (!uid) return res.send('no uid specified', 500);

    // TODO move to separate method to return user.notifications instead of always retruning user.notifications
    // User.findOne({id: uid}, function userFound(err, user) {
    //   if(err) return res.status(500).send(err);
    //   if(!user) return res.status(404).send('user not found');
    //
    //   res.status(200).send(user);
    // });
    User.findOne({id: uid})
    .populate('notifications')
    .exec(function (err, user){
      if(err) return res.status(500).send(err);
      if(!user) return res.status(404).send('user not found');
      user = JSON.parse(JSON.stringify(user));
      user.notifications = _.pluck(user.notifications, 'id');
      res.status(200).send(user);
    });
  },

  update: function (req, res) {

    var params = _.extend(req.query || {}, req.params || {}, req.body || {});
    var id = params.id;

    if (!id) return res.status(404).send('no id specified');

    var uid = null;
    if(req.user){
      uid = req.user.id;
    } else if(req.session && req.session.passport && req.session.passport.user){
      uid = req.session.passport.user;
    }

    if (!uid) return res.send('no uid specified', 500);
    if (uid !== id) return res.send('wrong user', 500);

    // update password
    if (params.credentials && params.credentials.oldPassword && params.credentials.newPassword) {
      var credentials = params.credentials;
      params = _.omit(params, 'credentials');

      Passport.findOne({user: id}, function (err, passport){
        if (err) return res.status(500).send(err);
        passport.validatePassword(credentials.oldPassword, function(err, passport){
          if (err) return res.status(500).send(err);
          if(passport){
            Passport.update(passport.id, {password: credentials.newPassword}, function(err, passport){
              if (err) return res.status(500).send(err);
              // TODO replace w/ function
              User.update(id, params, function userUpdated(err, updatedUser) {
                if (err) {
                  res.status(500).send(err);
                }
                if(!updatedUser) {
                  res.status(500).send('unable to update user');
                }
                updatedUser = _.isArray(updatedUser) ? updatedUser[0] : updatedUser;
                res.status(200).send(updatedUser);
              });
            });
          } else {
            return res.status(500).send('invalid password');
          }
        });
      });
    } else {
      // TODO replace w/ function
      User.update(id, params, function userUpdated(err, updatedUser) {
        if (err) {
          res.status(500).send(err);
        }
        if(!updatedUser) {
          res.status(500).send('unable to update user');
        }
        updatedUser = _.isArray(updatedUser) ? updatedUser[0] : updatedUser;
        res.status(200).send(updatedUser);
      });
    }
  },

  destroy: function (req, res) {
    var id = req.param('id');
    if (!id) return res.status(500).send('no id specified');

    var uid = null;
    if(req.user){
      uid = req.user.id;
    } else if(req.session && req.session.passport && req.session.passport.user){
      uid = req.session.passport.user;
    }

    if (!uid) return res.send('no uid specified', 500);
    if (uid !== id) return res.send('wrong user', 500);

    User.find({id: id}, function foundUser(err, user) {
      if (err) return res.status(500).send(err);
      if (!user) return res.status(404).send('no user with that id exists');

      User.destroy(user.id, function userDestroyed(err) {
        if (err) return res.status(404).send(err);

        return res.status(200).send({});
      });

    });
  },

  // ---------------------------------------------------------------------------
  // Notifications
  // ---------------------------------------------------------------------------
  addNotification: function (req, res){
    if(req.user){
      uid = req.user.id;
    } else if(req.session && req.session.passport && req.session.passport.user){
      uid = req.session.passport.user;
    }

    var params = _.extend(req.query || {}, req.params || {}, req.body || {});

    if (!uid) return res.send('no uid specified', 500);
    User.findOne({id: uid}, function foundUser(err, user) {
      if (err) return res.status(500).send(err);
      if (!user) return res.status(404).send('no user with that id exists');

      user.notifications.add(params.notification.id);
      user.save(function(err) {
        if (err) return res.status(500).send(err);
        return res.status(200).send({});
      });
    });
  },

  deleteNotification: function (req, res){
    if(req.user){
      uid = req.user.id;
    } else if(req.session && req.session.passport && req.session.passport.user){
      uid = req.session.passport.user;
    }

    var params = _.extend(req.query || {}, req.params || {}, req.body || {});

    if (!uid) return res.send('no uid specified', 500);
    User.findOne({id: uid}, function foundUser(err, user) {
      if (err) return res.status(500).send(err);
      if (!user) return res.status(404).send('no user with that id exists');

      user.notifications.remove(params.notification.id);
      user.save(function(err) {
        if (err) return res.status(500).send(err);
        return res.status(200).send({});
      });
    });
  }

};
