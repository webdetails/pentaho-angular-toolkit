describe('Controller: cdfDashboardController', function () {

  var cdfDashboardController, cdfHelper, dash, $scope;

  // excuted before each "it" is run.
  beforeEach(function (){

    // load the module.
    module('pat.cdf', function($provide){
      $provide.value('CdfHelper', {
        renderDashboard: function() { return 'something' },
        getNewDashboard: function() {
          return {
            then: function(callback) { return callback(dash); }
          };
        }
      });
      $provide.value('dash', { });
    })

    // inject your provider for testing.
    inject(function($controller, $rootScope, _CdfHelper_, _dash_) {
      $scope = $rootScope;
      cdfDashboardController = $controller('CdfDashboardController', { $scope: $scope });
      cdfHelper = _CdfHelper_;
      dash = _dash_;
    });
  });

  it('...', function () {
    var result = cdfDashboardController.setDashboard(dash);

    expect(result).toBe(dash);
  });

  it('...', function () {

    cdfDashboardController.setDashboard(dash);

    var result = cdfDashboardController.getDashboard();

    expect(result).toBe(dash);
  });

  it('...', function () {

    spyOn(cdfHelper,'renderDashboard').and.callThrough();

    cdfDashboardController.setDashboard(dash);

    var result = cdfDashboardController.render();

    expect(result).toBe('something');

    expect(cdfHelper.renderDashboard).toHaveBeenCalledWith(dash);
  });

  it('...', function () {

    spyOn(cdfHelper,'getNewDashboard').and.callThrough();

    var result = cdfDashboardController.setNewDashboard('some/path', 'some/element');

    expect(cdfHelper.getNewDashboard).toHaveBeenCalledWith('some/path', 'some/element');

    expect(result).toBe(dash);
  });
});