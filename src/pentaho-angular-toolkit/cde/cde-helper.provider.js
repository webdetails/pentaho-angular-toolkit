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


  CdeHelperProvider.$inject = ['UrlInterpolator'];
  function CdeHelperProvider(UrlInterpolator) {

    var _basePath = '';

    this.setBasePath = setBasePath;

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
      var url = ':basePath/api/:endpoint';

      return UrlInterpolator(url, {
        basePath: getBasePath(),
        endpoint: 'renderer/getDashboard',
        path: path
      }).getUrl;
    }

    this.$get = CdeHelper;

    /**
     * @ngdoc service
     * @name pat.cde.service:CdeHelper
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
