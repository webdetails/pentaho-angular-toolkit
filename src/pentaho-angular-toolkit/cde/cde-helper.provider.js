( function () {
  'use strict';

  // TODO: Most of this should probably move to a specific endpoints service that the other modules could use

  angular.module('pat.cde')
      .provider('CdeHelper', CdeHelperProvider)
      .config(config);

  config.$inject = [ 'CdeHelperProvider' ];
  function config ( CdeHelperProvider ){
    CdeHelperProvider.setBasePath('/pentaho/plugin/pentaho-cdf-dd');
  }

  /* @ngInject */
  CdeHelperProvider.$inject = [ 'UrlInterpolator' ];
  function CdeHelperProvider ( UrlInterpolator ) {

    var _basePath = '';

    this.setBasePath = setBasePath;

    function setBasePath ( path ) {
      _basePath = path;
    }

    function getBasePath () {
      return _basePath;
    }

    function getDashboardPath( path ) {
      var url = ':basePath/api/:endpoint';

      return new UrlInterpolator( url , {
        basePath: getBasePath(),
        endpoint: 'renderer/getDashboard',
        path: path
      } ).getUrl;
    }

    this.$get = CdeHelper;

    CdeHelper.$inject = ['$q'];
    function CdeHelper ( $q ) {

      var service = {
        getDashboardPath: getDashboardPath
      };

      return service;
    }
  }

} )();