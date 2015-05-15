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
      output: 'card-validator.js',
      min: 'card-validator.min.js'
    }
  },
  dist: 'dist'
};

gulp.task('lint', function () {
  gulp.src([config.src.js.all])
  .pipe(eslint())
  .pipe(eslint.format());
});

gulp.task('js', ['lint'], function () {
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
  del([ config.dist ], done);
});

gulp.task('build', ['clean', 'js']);
