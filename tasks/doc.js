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
    ]
  };

  return gulp
    .src(['src/**/*.js'])
    .pipe(gulpDocs.process(options))
    .pipe(gulp.dest('doc'));
};
