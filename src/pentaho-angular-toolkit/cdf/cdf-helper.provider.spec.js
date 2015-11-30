describe('Provider: cdfHelperProvider', function () {

  var cdfHelper, dash, $rootScope, $window;

  // excuted before each "it" is run.
  beforeEach(function (){

    // load the module.
    module('pat.cdf', function($provide){
      $provide.value('dash', {
        listenToOnce: function( dash , event , callback) { callback(); },
        render: function() {}
      });
    })

    // inject your provider for testing.
    inject(function(_CdfHelper_, _dash_, _$rootScope_ , _$window_ ) {
      cdfHelper = _CdfHelper_;
      dash = _dash_;
      $rootScope = _$rootScope_;
      $window = _$window_;
    });
  });

  it('should test receive the fulfilled promise', function () {

    var result;

    spyOn(dash, 'listenToOnce').and.callThrough();
    spyOn(dash, 'render');

    cdfHelper.renderDashboard(dash).then(function(returnFromPromise){
      result = returnFromPromise;
    });

    expect(dash.listenToOnce).toHaveBeenCalledWith(dash, 'cdf:postInit', jasmine.any(Function));
    expect(dash.render).toHaveBeenCalled();

    $rootScope.$apply(); // promises are resolved/dispatched only on next $digest cycle

    expect(result).toBe(dash);

  });

  it('..', function () {

    var path = 'some/path';
    var element = 'some/element';
    var spies = {};

    spies.mockDash = function (element) {};
    spies.mockDash = spyOn(spies,'mockDash').and.callThrough();

    spies.mockRequire = function  (paths, callback) { callback(spies.mockDash); }
    spies.mockRequire = spyOn( spies, 'mockRequire').and.callThrough();

    $window.require = spies.mockRequire;

    cdfHelper.getNewDashboard(path, element);

    expect(spies.mockRequire).toHaveBeenCalledWith([path] , jasmine.any(Function) );

    $rootScope.$apply();

    expect(spies.mockDash).toHaveBeenCalledWith(element);

  });

  it('..', function () {

    var result;

    function mockDash(element) {};
    function mockRequire (paths, callback) { callback(mockDash); }

    $window.require = mockRequire;

    cdfHelper.getNewDashboard( 'some/path' , 'some/element').then(function(returnFromPromise){
      result = returnFromPromise;
    });

    $rootScope.$apply();

    expect(result instanceof mockDash).toBe(true);
  });
});