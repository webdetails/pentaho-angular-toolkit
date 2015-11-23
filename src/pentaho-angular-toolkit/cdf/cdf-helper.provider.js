( function () {
  'use strict';

  angular.module('pat.cdf')
      .provider('CdfHelper', CdfHelperProvider);

  /* @ngInject */
  CdfHelperProvider.$inject = [ ];
  function CdfHelperProvider () {

    this.$get = CdfHelper;

    CdfHelper.$inject = ['$q'];
    function CdfHelper ( $q ) {

      var service = {
        getNewDashboard: getNewDashboard,
        renderDashboard: renderDashboard
      };

      return service;

      //////////////

      function getDashboardConstructor ( path ) {
        var deferred = $q.defer();

        require( [path] , deferred.resolve );

        // TODO: setTimeout or some other fail condition to reject promise??

        return deferred.promise;
      }

      function getNewDashboard ( path , element ) {
        return ( getDashboardConstructor( path ).then( mountDashboard ) );

        function mountDashboard ( Dash ) {
          return ( new Dash( element ) );
        }
      }

      function renderDashboard ( dash ) {
        var deferred = $q.defer();

        // TODO: Add observer, here.
        dash.listenToOnce( dash, 'cdf:postInit', resolvePromise );
        dash.render();

        function resolvePromise () {
          deferred.resolve( dash );
        }

        return deferred.promise;
      }
    }
  }
} )();