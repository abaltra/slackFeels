/**
 * restarts your app as you develop
 *
 * ---------------------------------------------------------------
 *
 *
 *
 */
var nodemon = require('gulp-nodemon');
module.exports = function(gulp, plugins, growl) {
  gulp.task('develop', function () {
    nodemon({ script: './app.js', ext: 'js', ignore: ['./.tmp/**', './assets/**', './config/**', './node_modules/**', './tasks/**', './views/**', 'bower.json', 'package.json', './gulpfile.js'] })
      .on('change', function(){
        //
      })
      .on('restart', function () {
        //
      });
  });
};
