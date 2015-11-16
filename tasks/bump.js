'use strict';

var $	 		= require('../gulp.config.js');
var gulp		= require('gulp');
var bump		= require('gulp-bump');
var argv 		= require('yargs').argv;

/**
 * Remove all files from the dist folder
 */
module.exports = function() {
	$.log('Updating version in *.json files.');

	var version = argv.version ? {version: argv.version}  : null;
	var type 	= argv.type ? {type: argv.type}  : '';

	return gulp.src('./*.json')
		.pipe(bump(version ? version : type))
		.pipe(gulp.dest('./'));
};