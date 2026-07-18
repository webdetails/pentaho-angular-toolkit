/*! ******************************************************************************
 *
 * Pentaho
 *
 * Copyright (C) 2026 by Pentaho Canada Inc. : http://www.pentaho.com
 *
 * Use of this software is governed by the Business Source License included
 * in the LICENSE.TXT file.
 *
 * Change Date: 2030-06-15
 ******************************************************************************/
'use strict';

var $ = require('../gulp.config.js');
var gulp = require('gulp');
var angularFilesort = require('gulp-angular-filesort');
var concat = require('gulp-concat');

/**
 * Optimize angular files
 * Move to dist folder
 *
 * @return {Stream}
 */
module.exports = function () {
    $.log('Optimizing angular files');

    return gulp
        .src([
            $.dev_path + $.module.name + '/**/*.js',
            '!' + $.dev_path + $.module.name + '/**/*.spec.js'
        ])
        .pipe(angularFilesort())
        .pipe(concat($.module.name + '.js'))
        .pipe(gulp.dest($.dist_path));
};