(function(angular) {
  'use strict';

  angular.module('pat.cdf')
    .controller('CdfDashboardController', CdfDashboardController);

  /**
   * @ngdoc controller
   * @name pat.cdf.controller:CdfDashboardController
   * @description This controller is mainly meant to be used by directives that want
   * to load a cdf dashboard and interface with it. It makes use of {@link pat.cdf.service:CdfHelper CdfHelper}
   * but it also keeps a register of the controlled dashboard.
   *
   */
  CdfDashboardController.$inject = ['CdfHelper'];
  function CdfDashboardController(CdfHelper) {
    var _dash;

    this.setDashboard = setDashboard;
    this.setNewDashboard = setNewDashboard;
    this.getDashboard = getDashboard;
    this.render = render;

    /**
     * @ngdoc method
     * @name pat.cdf.controller:CdfDashboardController#setDashboard
     * @methodOf pat.cdf.controller:CdfDashboardController
     * @description Sets the controlled cdf dashboard in the controller registry.
     *
     * @param {dashboard} dash A cdf dashboard.
     *
     * @returns {dashboard} The registered cdf dashboard (for chaining inside promise handlers).
     */
    function setDashboard(dash) {
      _dash = dash;
      return dash;
    }

    /**
     * @ngdoc method
     * @name pat.cdf.controller:CdfDashboardController#getDashboard
     * @methodOf pat.cdf.controller:CdfDashboardController
     * @description Gets the controlled dashboard from the controller registry.
     *
     * @returns {dashboard} The registered cdf dashboard.
     */
    function getDashboard() {
      return _dash;
    }

    /**
     * @ngdoc method
     * @name pat.cdf.controller:CdfDashboardController#render
     * @methodOf pat.cdf.controller:CdfDashboardController
     * @description Renders the dashboard registered in the controller. Makes use of
     * {@link pat.cdf.service:CdfHelper#renderDashboard CdfHelper#renderDashboard}.
     *
     * @returns {promise} A promise that will be resolved when the dashboard finishes rendering.
     *
     */
    function render() {
      return CdfHelper.renderDashboard(getDashboard());
    }

    /**
     * @ngdoc method
     * @name pat.cdf.controller:CdfDashboardController#setNewDashboard
     * @methodOf pat.cdf.controller:CdfDashboardController
     * @description Gets a new dashboard instance and sets in in the controller registry.
     *
     * @param {string} path A path with the dashboard definition module.
     * @param {element} element A DOM or jquery element where the dashboard should me mounted.
     *
     * @returns {promise} A promise that will be resolved when the dashboard definition is
     * fetched and a new dashboard is instantianted. The dashboard instance is passed to the
     * promise success handler.
     *
     */
    function setNewDashboard(path, element) {
      return CdfHelper.getNewDashboard(path, element).then(setDashboard);
    }

  }

})(window.angular);
