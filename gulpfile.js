var browserify = require('browserify');
var gulp       = require('gulp');
var source     = require('vinyl-source-stream');
var watch      = require('gulp-watch');
var uglify     = require("gulp-uglify");
var msx        = require("gulp-msx");
var plumber    = require('gulp-plumber');
var runSequence= require('run-sequence');

gulp.task('msx', function() {
	gulp.src('./src/js/*.js')                      // 変換前ファイル
	.pipe(plumber())
	.pipe(msx()) 
	.pipe(gulp.dest('./public/js/'));         // 変換後ファイル出力先
});

gulp.task('browserify', function() {
	return browserify('./public/js/app.js')
		.bundle()
		.pipe(plumber())
		//Pass desired output filename to vinyl-source-stream
		.pipe(source('./app.compile.js'))
		// Start piping stream to tasks!
		.pipe(gulp.dest('./public/js/'));
});

gulp.task('minify', function() {
	return gulp.src('./public/js/app.compile.js')
		.pipe(uglify())
		.pipe(gulp.dest('./public/js/'));
});


gulp.task('build', function(callback) {
	return runSequence(
		'msx',
		'browserify',
		'minify',
		callback
	);
});

gulp.task('watch', function() {
	gulp.watch('src/js/*.js', ['build']);
});
