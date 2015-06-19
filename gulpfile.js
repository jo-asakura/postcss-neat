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

gulp.task('css', function () {
  var concat = require('gulp-concat');
  var postcss = require('gulp-postcss');
  var autoprefixer = require('autoprefixer-core');
  var postcssMixins = require('postcss-mixins');
  var postcssNested = require('postcss-nested');
  var postcssVars = require('postcss-simple-vars');
  var neatMixins = require('./index.js');

  var processors = [
    autoprefixer({ browsers: ['last 1 version'] }),
    postcssVars,
    postcssMixins({ mixins: neatMixins() }),
    postcssNested
  ];

  return gulp.src('./demo/*.scss')
    .pipe(postcss(processors))
    .pipe(concat('styles.css'))
    .pipe(gulp.dest('./demo/'));
});

// Remove the built files
gulp.task('clean', function(cb) {
  var del = require('del');
  del(['lib'], cb);
});

gulp.task('build', ['lint', 'clean'], function() {
  var babel = require('gulp-babel');
  var sourcemaps = require('gulp-sourcemaps');

  return gulp.src('src/**/*.js')
      .pipe(sourcemaps.init())
      .pipe(babel())
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest('lib'));
});

gulp.task('default', ['lint', 'test']);
