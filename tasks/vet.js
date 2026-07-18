/*! ******************************************************************************
 *
 * Pentaho
 *
 * Copyright (C) 2026 by Pentaho Canada Inc. : http://www.pentaho.com
 *
 * Use of this software is governed by the Business Source License included
 * in the LICENSE.TXT file.
 *
 * Change Date: 2030-06-15
 ******************************************************************************/
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
