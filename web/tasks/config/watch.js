/**
 * Run predefined tasks whenever watched file patterns are added, changed or deleted.
 *
 * ---------------------------------------------------------------
 *
 * Watch for changes on
 * - files in the `assets` folder
 * - the `tasks/pipeline.js` file
 * and re-run the appropriate tasks.
 *
 *
 */
module.exports = function(gulp, plugins, growl) {
  //gulp.task('watch:api', function() {
  //  // Watch files
  //  return gulp.watch('api/**/*', ['syncAssets'])
  //    .on('change', function(file) {
  //      server.changed(file.path);
  //    });
  //});

  gulp.task('watch:assets', function() {
    plugins.livereload.listen();
    return gulp.watch(['assets/src/app/**/*.{html,js}', 'assets/styles/**/*.less'], ['syncAssets'])
      .on('change', function(file) {
        //server.changed(file.path);
        plugins.livereload.reload()
      })
      .on('error', function(){
        //
      });
  });
};
