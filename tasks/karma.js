'use strict';

var $	 	= require('../gulp.config.js');
var gulp 	= require('gulp');
var Server 	= require('karma').Server;

/**
 * Run test once and exit
 */
 module.exports = function(done) {
 	$.log('Run karma tests');

 	new Server({
 		configFile: __dirname + '/../karma.conf.js',
 		singleRun: true
 	}, done).start();
 };