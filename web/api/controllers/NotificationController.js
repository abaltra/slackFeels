/**
 * NotificationController
 *
 * @description :: Server-side logic for managing notifications
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {


  index: function (req, res) {

    Notification.find(function (err, notifications) {
      if(err) return res.status(500).send(err);

      res.status(200).send(notifications);
    });
  }

};