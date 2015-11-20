'use strict';

var $	 			= require('../gulp.config.js');
var gulp			= require('gulp');
var shell			= require('gulp-shell');

/**
 * Create jsdoc documentation
 *
 * @return {Stream}
 */
module.exports = function() {
	$.log('Creating documentation');

	return gulp
		.src([$.dev_path + $.module.name + '/**/*.js'])
		.pipe( shell('jsdoc <%= file.path %> -d ' + $.doc_path ) );
};