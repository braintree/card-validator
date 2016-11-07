'use strict';

var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var streamify = require('gulp-streamify');
var size = require('gulp-size');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var del = require('del');

var config = {
  src: {
    js: {
      all: './src/**/*.js',
      main: './index.js',
      output: 'card-validator.js',
      min: 'card-validator.min.js'
    }
  },
  dist: 'dist'
};

gulp.task('js', function () {
  return browserify({standalone: 'cardValidator'})
    .add(config.src.js.main)
    .bundle()
    .pipe(source(config.src.js.output))
    .pipe(streamify(size()))
    .pipe(gulp.dest(config.dist))
    .pipe(streamify(uglify()))
    .pipe(streamify(size()))
    .pipe(rename(config.src.js.min))
    .pipe(gulp.dest(config.dist));
});

gulp.task('clean', function (done) {
  del([config.dist], done);
});

gulp.task('build', ['clean', 'js']);
