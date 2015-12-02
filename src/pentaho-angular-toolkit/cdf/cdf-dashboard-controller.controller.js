(function(angular) {
  'use strict';

  angular.module('pat.cdf')
      .controller('CdfDashboardController', CdfDashboardController );


  /**
   * @ngdoc controller
   * @name pat.cdf.controller:CdfDashboardController
   * @description something something
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
     * @description something something
     *
     * @param {dashboard} dash something something
     *
     * @returns {dashboard} something something
     */
    function setDashboard(dash) {
      _dash = dash;
      return dash;
    }

    /**
     * @ngdoc method
     * @name pat.cdf.controller:CdfDashboardController#getDashboard
     * @methodOf pat.cdf.controller:CdfDashboardController
     * @description something something
     *
     * @returns {dashboard} something something
     */
    function getDashboard() {
      return _dash;
    }

    /**
     * @ngdoc method
     * @name pat.cdf.controller:CdfDashboardController#render
     * @methodOf pat.cdf.controller:CdfDashboardController
     * @description something something
     *
     * @returns {promise} something something
     *
     */
    function render() {
      return CdfHelper.renderDashboard(getDashboard());
    }

    /**
     * @ngdoc method
     * @name pat.cdf.controller:CdfDashboardController#setNewDashboard
     * @methodOf pat.cdf.controller:CdfDashboardController
     * @description something something
     *
     * @param {string} path something something
     * @param {element} element something something
     *
     * @returns {promise} something something
     *
     */
    function setNewDashboard(path, element) {
      return CdfHelper.getNewDashboard(path, element).then(setDashboard);
    }

  }

})(window.angular);
