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

var $	 	= require('../gulp.config.js');
var del 	= require('del');

/**
 * Remove all files from the dist folder
 */
module.exports = function() {
  $.log('Cleaning dist and doc folders');

  return del.sync([$.dist_path, $.module.dist_path, $.doc_path]);
};
