'use strict';

var $	 		= require('../gulp.config.js');
var gulp		= require('gulp');
var file 		= require('gulp-file');
var jsonfile 	= require('jsonfile');
var _ 			= require('underscore');


/**
 *
 */
module.exports = function() {

	var rootPackage = jsonfile.readFileSync('./package.json');
	var newPackage 	= _.omit(rootPackage, ['devDependencies', 'scripts']);

	return gulp.src($.module.files)
		.pipe(file('package.json', JSON.stringify(newPackage, null, 4)))
		.pipe(gulp.dest($.module.dist_path));
};
