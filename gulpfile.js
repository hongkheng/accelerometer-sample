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
	return gulp.src(paths.scripts)
		.pipe(plugins.jshint())
		.pipe(plugins.jshint.reporter('default'));
});

gulp.task('watch', function(){
	plugins.livereload.listen();
	gulp.watch(['src/**']).on('change', plugins.livereload.changed);
});

gulp.task('default', ['connect', 'watch', 'scripts']);