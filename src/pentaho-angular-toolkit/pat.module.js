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
   */
  angular.module('pat', [
     'pat.cdf',
     'pat.cde',
     'pat.analyzer'
  ]);

})(window.angular);
