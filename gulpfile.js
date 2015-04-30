'use strict';

var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var streamify = require('gulp-streamify');
var size = require('gulp-size');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var watch = require('gulp-watch');
var eslint = require('gulp-eslint');
var del = require('del');

var config = {
  namespace: 'braintree',
  src: {
    js: {
      all: './src/**/*.js',
      main: './index.js',
      watch: './public/js/**/*.js',
      output: 'card-validator.js',
      min: 'card-validator.min.js'
    }
  },
  dist: { js: 'dist' }
};

gulp.task('lint', function () {
  gulp.src([config.src.js.main])
  .pipe(eslint())
  .pipe(eslint.format());
});

gulp.task('js', ['lint'], function () {
  return browserify({
      entries: config.src.js.main,
      standalone: 'card-validator'
    })
    .bundle()
    .pipe(source(config.src.js.output))
    .pipe(streamify(size()))
    .pipe(gulp.dest(config.dist.js))
    .pipe(streamify(uglify()))
    .pipe(streamify(size()))
    .pipe(rename(config.src.js.min))
    .pipe(gulp.dest(config.dist.js));
});

gulp.task('watch', ['js'], function () {
  gulp.watch(config.src.js.watch, ['js']);
});

gulp.task('clean', function (done) {
  del([ config.dist.js ], done);
});

gulp.task('build', ['clean', 'js']);
