
(function(angular) {
  'use strict';

  angular.module('pat.cdf')
      .provider('CdfHelper', CdfHelperProvider);

  /* @ngInject */
  CdfHelperProvider.$inject = [];
  function CdfHelperProvider() {

    this.$get = CdfHelper;

    /**
     * @ngdoc service
     * @name pat.cdf.service:CdfHelper
     */
    CdfHelper.$inject = ['$q'];
    function CdfHelper($q) {

      var service = {
        getNewDashboard: getNewDashboard,
        renderDashboard: renderDashboard
      };

      return service;

      //////////////

      function getDashboardConstructor(path) {
        var deferred = $q.defer();

        require([path], deferred.resolve);

        // TODO: setTimeout or some other fail condition to reject promise??

        return deferred.promise;
      }

      /**
       * @ngdoc method
       * @name pat.cdf.service:CdfHelper#getNewDashboard
       * @methodOf pat.cdf.service:CdfHelper
       * @description TODO: add description
       *
       * @param {string} path something something
       * @param {element} element something something
       *
       * @returns {dashboard} something something
       */
      function getNewDashboard(path, element) {
        return (getDashboardConstructor(path).then(mountDashboard));

        function mountDashboard(Dash) {
          return (new Dash(element));
        }
      }

      /**
       * @ngdoc method
       * @name pat.cdf.service:CdfHelper#renderDashboard
       * @methodOf pat.cdf.service:CdfHelper
       *
       * @param {dashboard} dash something something
       *
       * @returns {promise} something something
       */
      function renderDashboard(dash) {
        var deferred = $q.defer();

        // TODO: Add observer, here.
        dash.listenToOnce(dash, 'cdf:postInit', resolvePromise);
        dash.render();

        function resolvePromise() {
          deferred.resolve(dash);
        }

        return deferred.promise;
      }
    }
  }
})(window.angular);
