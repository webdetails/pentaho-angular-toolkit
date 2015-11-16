'use strict';

var $	 	= require('../gulp.config.js');
var del 	= require('del');

/**
 * Remove files from folders
 */
 module.exports = function() {
    $.log('Cleaning folders');
    return del.sync([$.dist_path, $.module.dist_path]);
};