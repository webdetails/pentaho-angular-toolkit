'use strict';

var $ = require('../gulp.config.js');
var gulp = require('gulp');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');

/**
 * Vet the code and create coverage report
 *
 * @return {Stream}
 */
module.exports = function() {
  $.log('Analyzing source with JSHint and JSCS');

  return gulp
      .src([$.dev_path + $.module.name + '/**/*.js'])
      .pipe(jshint())
      .pipe(jshint.reporter('jshint-stylish', {verbose: true}))
      .pipe(jscs())
      .pipe(jscs.reporter());
};
