var gulp = require('gulp');
var gulpLoadPlugins = require('gulp-load-plugins');
var plugins = gulpLoadPlugins();
var del = require('del');

gulp.task('webserver', function() {
  plugins.connect.server({
    root: __dirname,
    livereload: true
  });
});

var paths = {
	src: {
		scss: ['src/scss/*.scss','src/scss/**/*.scss'],
		js: ['src/scripts/*.js','src/scripts/**/*.js'],
		img: ['src/img/*','src/img/**/*']
	},
	livereload: ['web/styles/*.css', 'web/scripts/*.js', 'web/img/*' , '*.html'] // only reload when these change
}

gulp.task('livereload', function() {
  gulp.src( paths.livereload )
    .pipe(plugins.watch( paths.livereload ))
    .pipe(plugins.connect.reload());
});

gulp.task('styles', function() {
  return gulp.src( paths.src.scss )
    .pipe(plugins.sass({ style: 'expanded' }))
    .pipe(plugins.autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(plugins.concat('style.css'))
    .pipe(gulp.dest('web/.temp/styles'))
    .pipe(plugins.rename({suffix: '.min'}))
    .pipe(plugins.minifyCss())
    .pipe(gulp.dest('web/styles'));
});

gulp.task('scripts', function() {
  return gulp.src( paths.src.js )
    .pipe(plugins.jshint('.jshintrc'))
    .pipe(plugins.jshint.reporter('default'))
    .pipe(plugins.concat('script.js'))
    .pipe(gulp.dest('web/.temp/scripts'))
    .pipe(plugins.rename({suffix: '.min'}))
    .pipe(plugins.uglify())
    .pipe(gulp.dest('web/scripts'));
});

gulp.task('images', function() {
  return gulp.src( paths.src.img )
    .pipe(plugins.cache(plugins.imagemin({ optimizationLevel: 5, progressive: true, interlaced: true })))
    .pipe(gulp.dest('web/img'));
});

gulp.task('clean', function(cb) {
    del(['web'], cb)
});

gulp.task('watch', function() {
  // Watch .scss files
  gulp.watch(paths.src.scss, ['styles']);
  // Watch .js files
  gulp.watch(paths.src.js, ['scripts']);
  // Watch image files
  gulp.watch(paths.src.img, ['images']);
});

/*============================================================*/

/* serves at http://localhost:8080 */
gulp.task('default', ['build','webserver','livereload','watch']);

gulp.task('build', ['clean', 'styles', 'scripts', 'images'], function() {
    gulp.start('styles', 'scripts', 'images');
});
