var gulp = require('gulp');

// Load all gulp plugins
var plugins = require('gulp-load-plugins')();

var pkg = require('./package.json');

gulp.task('connect', function() {
	plugins.connect.server({
		root: 'src',
		livereload: true
	});
});

gulp.task('html', function() {
	gulp.src('src/*.html').pipe(plugins.connect.reload());
});

gulp.task('default', ['connect']);