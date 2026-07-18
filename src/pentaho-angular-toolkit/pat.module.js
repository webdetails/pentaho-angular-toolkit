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
/**
 * @typedef dashboard
 */
/**
 * @typedef element
 */

(function(angular) {
  'use strict';

  /**
   * @ngdoc overview
   * @name pat
   * @description The pat module is the main module for pentaho-angular-toolkit.
   * It is essentially an aggregation of the {@link pat.cdf}, {@link pat.cde}
   * and {@link pat.analyzer} modules.
   */
  angular.module('pat', [
    'pat.cdf',
    'pat.cde',
    'pat.analyzer'
  ]);

})(window.angular);
