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

var $	 			= require('../gulp.config.js');
var gulp			= require('gulp');
var gulpDocs = require('gulp-ngdocs');


/**
 * Create jsdoc documentation
 *
 * @return {Stream}
 */
module.exports = function() {
  $.log('Creating documentation');

  var options = {
    scripts: [
      'http://ajax.googleapis.com/ajax/libs/angularjs/1.4.8/angular.min.js',
      'http://ajax.googleapis.com/ajax/libs/angularjs/1.4.8/angular-animate.min.js'
    ],
    title:'Pentaho Angular Toolkit'
  };

  return gulp
    .src(['src/**/*.js'])
    .pipe(gulpDocs.process(options))
    .pipe(gulp.dest('doc'));
};
