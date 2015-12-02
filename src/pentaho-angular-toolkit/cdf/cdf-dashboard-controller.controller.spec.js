describe('Controller: cdfDashboardController', function () {

  var cdfDashboardController, cdfHelperMock, dashMock, $scope;

  beforeEach(function (){

    module('pat.cdf', function($provide){
      $provide.value('CdfHelper', {
        renderDashboard: function() { return 'someDashboard' },
        getNewDashboard: function() {
          return {
            then: function(callback) { return callback(dashMock); }
          };
        }
      });
      $provide.value('dash', {});
    })

    inject(function($controller, $rootScope, _CdfHelper_, _dash_) {
      $scope = $rootScope;
      cdfDashboardController = $controller('CdfDashboardController', { $scope: $scope });
      cdfHelperMock = _CdfHelper_;
      dashMock = _dash_;
    });
  });

  it('should return the same value that was passed', function () {
    var result = cdfDashboardController.setDashboard(dashMock);
    expect(result).toBe(dashMock);
  });

  it('should return the value that was set', function () {
    cdfDashboardController.setDashboard(dashMock);
    var result = cdfDashboardController.getDashboard();
    expect(result).toBe(dashMock);
  });

  it('should return mocked value', function () {
    var result = cdfDashboardController.render();
    expect(result).toBe('someDashboard');
  });

  it('tracks that spy was called', function () {
    spyOn(cdfHelperMock,'renderDashboard').and.callThrough();
    cdfDashboardController.render();
    expect(cdfHelperMock.renderDashboard).toHaveBeenCalled();
  });

  it('tracks that spy was called with passed parameters', function () {
    spyOn(cdfHelperMock,'getNewDashboard').and.callThrough();
    cdfDashboardController.setNewDashboard('some/path', 'some/element');
    expect(cdfHelperMock.getNewDashboard).toHaveBeenCalledWith('some/path', 'some/element');
  });

  it('should return mocked callback value after promise', function () {
    var result = cdfDashboardController.setNewDashboard('some/path', 'some/element');
    expect(result).toBe(dashMock);
  });
});