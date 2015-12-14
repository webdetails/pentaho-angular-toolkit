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
