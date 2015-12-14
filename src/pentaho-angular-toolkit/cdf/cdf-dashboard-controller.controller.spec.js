describe('Controller: cdfDashboardController', function() {
  'use strict';

  var cdfDashboardController;
  var cdfHelperMock;
  var dashMock;
  var $scope;

  beforeEach(function() {

    module('pat.cdf', function($provide) {
      $provide.value('CdfHelper', {
        renderDashboard: function() {
          return 'someDashboard';
        },
        getNewDashboard: function() {
          return {
            then: function(callback) {
              return callback(dashMock);
            }
          };
        }
      });
      $provide.value('dash', {});
    });

    inject(function($controller, $rootScope, _CdfHelper_, _dash_) {
      $scope = $rootScope;
      cdfDashboardController = $controller('CdfDashboardController', {$scope: $scope});
      cdfHelperMock = _CdfHelper_;
      dashMock = _dash_;
    });
  });

  it('should return the registered cdf dashboard', function() {
    var result = cdfDashboardController.setDashboard(dashMock);
    expect(result).toBe(dashMock);
  });

  it('should return the controlled dashboard thar was registered', function() {
    cdfDashboardController.setDashboard(dashMock);
    var result = cdfDashboardController.getDashboard();
    expect(result).toBe(dashMock);
  });

  it('should render the dashboard registered in the controller', function() {
    var result = cdfDashboardController.render();
    expect(result).toBe('someDashboard');
  });

  it('should ask helper service to render registered dashboard', function() {
    spyOn(cdfHelperMock, 'renderDashboard').and.callThrough();
    cdfDashboardController.render();
    expect(cdfHelperMock.renderDashboard).toHaveBeenCalled();
  });

  it('should ask helper service to get a new dashboard with passed parameters', function() {
    spyOn(cdfHelperMock, 'getNewDashboard').and.callThrough();
    cdfDashboardController.setNewDashboard('some/path', 'some/element');
    expect(cdfHelperMock.getNewDashboard).toHaveBeenCalledWith('some/path', 'some/element');
  });

  it('should get new dashboard instance', function() {
    var result = cdfDashboardController.setNewDashboard('some/path', 'some/element');
    expect(result).toBe(dashMock);
  });
});
