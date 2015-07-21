'use strict';

var gulp = require('gulp');

gulp.task('lint', function () {
  var eslint = require('gulp-eslint');
  return gulp.src(['src/index.js', 'test/*.js', 'gulpfile.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('test', function () {
  require('babel/register');
  var mocha = require('gulp-mocha');
  return gulp.src('test/*.js', { read: false }).pipe(mocha());
});

gulp.task('clean', function (cb) {
  var del = require('del');
  del(['lib'], cb);
});

gulp.task('build', ['lint', 'clean'], function () {
  var babel = require('gulp-babel');
  var sourcemaps = require('gulp-sourcemaps');

  return gulp.src('src/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('lib'));
});

//require('babel/polyfill');

// an example of usage (see /demo folder for the result)
gulp.task('css', function () {
  var concat = require('gulp-concat');
  var postcss = require('gulp-postcss');
  var postcssNeat = require('./lib/index.js');
  var postcssNested = require('postcss-nested');
  var postcssVars = require('postcss-simple-vars');
  var autoprefixer = require('autoprefixer-core');

  var processors = [
    autoprefixer({ browsers: ['last 1 version'] }),
    postcssNeat({}),
    postcssNested,
    postcssVars
  ];

  return gulp.src('./demo/*.scss')
    .pipe(postcss(processors))
    .pipe(concat('styles.css'))
    .pipe(gulp.dest('./demo/'));
});

gulp.task('default', ['lint', 'test']);
