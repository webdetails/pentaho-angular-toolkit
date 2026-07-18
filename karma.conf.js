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

module.exports = function(config) {
  config.set({

    browsers: ['PhantomJS'],

    frameworks: ['jasmine'],

    files: [
      'node_modules/angular/angular.js',
      'node_modules/angular-mocks/angular-mocks.js',
      'src/pentaho-angular-toolkit/**/*.module.js',
      'src/pentaho-angular-toolkit/**/*.js'
    ]
  });
};