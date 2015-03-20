module.exports = function (gulp, plugins) {
  gulp.task('server', function(cb) {
    plugins.sequence(
      //['watch:assets', 'develop'],
      'develop',
      cb
    );
  });
};
