'use strict';

var gulp		    = require('gulp');
var runSequence     = require('run-sequence');
var taskLoader		= require('gulp-task-loader');

// load all tasks from folder 'tasks' (or whatever you like)
// tasks named after task file name
taskLoader('tasks');

gulp.task('default', function(cb) {
	 runSequence('clean', 'jshint', 'karma', 'build', cb);
});

gulp.task('release', ['default'], function(cb) {
	 runSequence('bump', 'module', cb);
});

gulp.task('deploy', ['default'], function(cb) {
	runSequence('module', cb);
});