describe('Provider: cdfHelperProvider', function() {

  var cdfHelper, dashMock, $rootScope, $window;

  beforeEach(function() {

    module('pat.cdf', function($provide) {
      $provide.value('dash', {
        listenToOnce: function(dash, event, callback) { callback(); },
        render: function() {}
      });
    });

    inject(function(_CdfHelper_, _dash_, _$rootScope_, _$window_) {
      cdfHelper = _CdfHelper_;
      dashMock = _dash_;
      $rootScope = _$rootScope_;
      $window = _$window_;
    });
  });

  it('should ask service to render a dashboard', function() {
    spyOn(dashMock, 'listenToOnce').and.callThrough();
    spyOn(dashMock, 'render');
    cdfHelper.renderDashboard(dashMock);

    expect(dashMock.listenToOnce).toHaveBeenCalledWith(dashMock, 'cdf:postInit', jasmine.any(Function));
    expect(dashMock.render).toHaveBeenCalled();
  });

  it('should receive a dashboard after render promise fulfilled', function() {
    cdfHelper.renderDashboard(dashMock).then(function(returnFromPromise) {
      expect(returnFromPromise).toBe(dashMock);
    });
    $rootScope.$apply();
  });

  it('should pass dashboard path to be loaded by RequireJS and element where the dashboard should be mounted', function() {

    var spies = {};
    spies.mockDash = function(element) {};
    spies.mockDash = spyOn(spies,'mockDash').and.callThrough();
    spies.mockRequire = function(paths, callback) { callback(spies.mockDash); };
    spies.mockRequire = spyOn(spies, 'mockRequire').and.callThrough();

    $window.require = spies.mockRequire;

    cdfHelper.getNewDashboard('some/path', 'some/element');

    $rootScope.$apply();

    expect(spies.mockRequire).toHaveBeenCalledWith(['some/path'] , jasmine.any(Function));
    expect(spies.mockDash).toHaveBeenCalledWith('some/element');
  });

  it('should return a new dashboard instance after loaded from given path', function() {

    function mockDash(element) {};
    function mockRequire(paths, callback) { callback(mockDash); }

    $window.require = mockRequire;

    cdfHelper.getNewDashboard('some/path' , 'some/element').then(function(returnFromPromise) {
      expect(returnFromPromise instanceof mockDash).toBe(true);
    });

    $rootScope.$apply();
  });
});
