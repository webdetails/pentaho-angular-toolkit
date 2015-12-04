(function(angular) {
  'use strict';

  // TODO: Most of this should probably move to a specific endpoints service that the other modules could use

  angular.module('pat.cde')
      .provider('CdeHelper', CdeHelperProvider)
      .config(config);

  config.$inject = ['CdeHelperProvider'];
  function config(CdeHelperProvider) {
    CdeHelperProvider.setBasePath('/pentaho/plugin/pentaho-cdf-dd');
  }

  CdeHelperProvider.$inject = [];
  function CdeHelperProvider() {

    var _basePath = '';

    this.setBasePath = setBasePath;
    this.getBasePath = getBasePath;

    function setBasePath(path) {
      _basePath = path;
    }

    function getBasePath() {
      return _basePath;
    }

    /**
     * @ngdoc method
     * @name pat.cde.service:CdeHelper#getDashboardPath
     * @methodOf pat.cde.service:CdeHelper
     * @description something something
     *
     * @param {string} path something something
     *
     * @returns {string} something something
     */
    function getDashboardPath(path) {
      var url = getBasePath() + '/api/renderer/getDashboard?path=' + path;

      return url;
    }

    this.$get = CdeHelper;

    /**
     * @ngdoc service
     * @name pat.cde.service:CdeHelper
     * @description The CdeHelper service acts as an abstraction layer so
     * that controllers and directives don't have to directly interface with
     * {@link http://www.webdetails.pt/ctools/cde/ CDE} using $http.
     */
    CdeHelper.$inject = [ ];
    function CdeHelper() {

      var service = {
        getDashboardPath: getDashboardPath
      };

      return service;
    }
  }

})(window.angular);
