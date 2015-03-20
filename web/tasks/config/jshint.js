/**
 *
 *
 * ---------------------------------------------------------------
 *
 *
 */
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');

// load scripts to lint
var scripts = [
  './api/**/*.js',
  './assets/src/**/*.js',
  './config/**/*.js',
  './tasks/**/*.js',
  './gulpfile.js',
  './app.js'
];

module.exports = function(gulp, plugins, growl) {
  gulp.task('jshint', function() {
    return gulp.src(scripts)
      .pipe(jshint())
      .pipe(jshint.reporter(stylish));
  });
};


