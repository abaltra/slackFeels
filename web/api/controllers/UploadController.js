/**
 * UploadController
 *
 * @description :: Server-side logic for managing assets upload
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var fs = require('fs');
var path = require( 'path' );
var _ = require('lodash');

module.exports = {

  file: function (req, res) {

    req.file('file').upload({
      adapter: require('skipper-s3'),
      bucket: sails.config.s3.bucket,
      key: sails.config.s3.key,
      secret: sails.config.s3.secret
    }, function whenDone(err, uploadedFiles) {

      if (err) return res.status(500).send(err);
      else {
        var files = _.map(uploadedFiles, function(uploadedFile){
          return uploadedFile.extra.Location;
        });
        return res.status(200).send(files);
      }

    });

  }

};

