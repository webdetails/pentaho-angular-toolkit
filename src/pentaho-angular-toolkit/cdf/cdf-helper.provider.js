
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
     * @description The CdfHelper service acts as an abstraction layer so
     * that controllers and directives don't have to directly interface with
     * {@link http://www.webdetails.pt/ctools/cdf/ CDF} using $http.
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
       * @description This methods fetches a dashboard constructor from the server,
       * from a specified path, and instantiates. It returns a promise that, when resolved,
       * passes the instantiated dashboard to success handler.
       *
       * The services makes use of {@link http://requirejs.org/ requireJS} to assynchronously
       * load the dashboard constructor, and assumes the 'require' global is present in the
       * window object.
       *
       * Additionally, most of the times the constructor dependencies rely on certain requireJS
       * configurations, that should be defined in the application. See this link for more information
       * on the requirements to embed pentaho cdf dashboards:
       * {@link http://redmine.webdetails.org/projects/cdf/wiki/RequireJS#Embedded-Capabilities CDF Embedding}
       *
       * @param {string} path A path to a dashboard constructor module to be loaded using RequireJS.
       * @param {element} element A DOM element or jquery wrapper element where the dashboard should be mounted.
       *
       * @returns {promise} A promise that will be resolved when the dashboard definition modules is
       * returned and a new dashboard instance is created.
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
       * @param {dashboard} dash An instance of a cdf dashboard, previously fetched using
       * {@link pat.cdf.service:CdfHelper#getNewDashboard getNewDashboard}
       *
       * @returns {promise} A promise that will be resolved when the dashboard finishes rendering, so the
       * users of the service know when it is stable to do more operations.
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
