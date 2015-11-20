'use strict';

var gulp		    = require('gulp');
var runSequence     = require('run-sequence');
var taskLoader		= require('gulp-task-loader');
var $	 			= require('./gulp.config.js');

// load all tasks from folder 'tasks'
// tasks named after task file name
taskLoader('tasks');


gulp.task('default', function(cb){
	runSequence('build', cb);
});

/**
 * Clean dist folders
 * Test and validate code
 * Optimize angular files
 * Create dist module
 *
 * @param  {Function} done - callback when complete
 */
gulp.task('build', function(cb) {
	runSequence('clean', 'test', 'angular', 'module', cb);
});

/**
 * Vet the code
 * Start the tests using karma
 *
 * @param  {Function} done - callback when complete
 */
gulp.task('test', function(cb) {
	runSequence('vet', 'karma', cb);
});

/**
 * Bump the version and create dist module
 * --type=pre will bump the prerelease version *.*.*-x
 * --type=patch or no flag will bump the patch version *.*.x
 * --type=minor will bump the minor version *.x.*
 * --type=major will bump the major version x.*.*
 * --version=1.2.3 will bump to a specific version and ignore other flags
 *
 * @param  {Function} done - callback when complete
 */
gulp.task('release', function(cb) {
	 runSequence('bump', 'module', cb);
});