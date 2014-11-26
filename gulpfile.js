var gulp = require('gulp');

// Load all gulp plugins
var plugins = require('gulp-load-plugins')();

var pkg = require('./package.json');

var paths = {
	scripts: ['src/js/**/*.js', 'gulpfile.js']
};

gulp.task('connect', function() {
	plugins.connect.server({
		root: 'src',
		livereload: true
	});
});

gulp.task('html', function() {
	gulp.src('src/*.html').pipe(plugins.connect.reload());
});

gulp.task('scripts', function(){
	gulp.src(paths.scripts)
		.pipe(plugins.jshint())
		.pipe(plugins.jshint.reporter('default'))
		.pipe(plugins.connect.reload());
});

gulp.task('watch', function(){
	gulp.watch(['src/*.html'], ['html']);
	gulp.watch(paths.scripts, ['scripts']);
});

gulp.task('default', ['connect', 'watch', 'scripts']);