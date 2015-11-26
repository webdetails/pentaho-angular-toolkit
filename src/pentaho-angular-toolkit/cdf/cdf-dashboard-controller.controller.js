(function(angular) {
  'use strict';

  angular.module('pat.cdf')
      .controller('CdfDashboardController', CdfDashboardController );

  // TODO: Move some of the API to the controller, for sharing with other directives
  CdfDashboardController.$inject = ['CdfHelper'];
  function CdfDashboardController(CdfHelper) {
    var _dash;

    this.setDashboard = setDashboard;
    this.setNewDashboard = setNewDashboard;
    this.getDashboard = getDashboard;
    this.render = render;

    function setDashboard(dash) {
      _dash = dash;
      return dash;
    }

    function getDashboard() {
      return _dash;
    }

    function render() {
      return CdfHelper.renderDashboard(getDashboard());
    }

    function setNewDashboard(path, element) {
      return CdfHelper.getNewDashboard(path, element).then(setDashboard);
    }

  }

})(window.angular);
