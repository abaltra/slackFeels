/**
 * HomeController
 *
 * @description :: Server-side logic for managing homes
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  index: function(req, res) {
    if(req.user){
      res.cookie('user',  JSON.stringify({
        id: req.user.id,
        username: req.user.username,
        email: req.user.email,
        name: req.user.name,
        image: req.user.image,
        role: req.user.role
      }));
    }
    res.view({
      title: 'web',
      locales: sails.config.i18n.locales,
      layout: 'layout'
    });
  }
};
