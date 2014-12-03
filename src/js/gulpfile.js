var gulp = require('gulp');

// Load all gulp plugins
var plugins = require('gulp-load-plugins')();
var stylish = require('jshint-stylish');

var pkg = require('./package.json');

var paths = {
    scripts: ['src/js/**/*.js', 'gulpfile.js']
};

gulp.task('connect', function() {
    plugins.connect.server({
        root: ['src', 'bower_components'],
        livereload: true
    });
});

gulp.task('html', function() {
    gulp.src('src/*.html').pipe(plugins.jsbeautifier({
            indentSize: 2
        })).pipe(gulp.dest('src'))
        .pipe(plugins.connect.reload());
});

gulp.task('scripts', function() {
    return gulp.src(paths.scripts)
        .pipe(plugins.jsbeautifier({
            indentSize: 2
        }))
        .pipe(gulp.dest('src/js'))
        .pipe(plugins.jshint())
        .pipe(plugins.jshint.reporter(stylish));
});

gulp.task('watch', function() {
    plugins.livereload.listen();
    gulp.watch(['src/**']).on('change', plugins.livereload.changed);
    gulp.watch(paths.scripts, ['scripts']);
});

gulp.task('default', ['connect', 'html', 'scripts', 'watch']);
