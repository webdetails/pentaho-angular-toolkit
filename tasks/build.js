'use strict';

var $	 			= require('../gulp.config.js');
var gulp			= require('gulp');
var angularFilesort	= require('gulp-angular-filesort');
var concat			= require('gulp-concat');

/**
 * 
 */
 module.exports = function() {

 	return gulp
	 	.src([$.dev_path + $.module.name + '/**/*.js'])
	 	.pipe(angularFilesort())
	 	.pipe(concat($.module.name + '.js'))
	 	.pipe(gulp.dest($.dist_path));
 };