'use strict';

var $	 	= require('../gulp.config.js');
var gulp 	= require('gulp');
var Server 	= require('karma').Server;

/**
 * Start the tests using karma
 * Run test once and exit
 *
 * @param  {Function} done - Callback to fire when karma is done
 */
module.exports = function(done) {
  $.log('Runing karma tests');

  new Server({
    configFile: __dirname + '/../karma.conf.js',
    singleRun: true
  }, done).start();
};
