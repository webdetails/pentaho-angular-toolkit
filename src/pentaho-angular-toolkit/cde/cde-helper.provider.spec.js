describe('Provider: cdeHelperProvider', function() {

  var cdeHelper, cdeHelperProvider, urlInterpolator;

  beforeEach(function() {

    module('pat.utils', function($provide) {
      $provide.constant('UrlInterpolator', jasmine.createSpy('urlInterpolatorSpy').and.callFake(function() {
        return {
          getUrl: 'some/url'
        };
      }));
    });

    module('pat.cde', function(_CdeHelperProvider_) {
      cdeHelperProvider = _CdeHelperProvider_;
    });

    inject(function(_CdeHelper_) {
      cdeHelper = _CdeHelper_;
    });
  });

  it('should exist', function() {
    expect(cdeHelperProvider.setBasePath).toBeDefined();
  });

  it('should return mocked value', function() {
    var result = cdeHelper.getDashboardPath('some/path');
    expect(result).toBe('some/url');
  });

  it('tracks that spy was called with passed parameters', inject(function(UrlInterpolator) {
    spyOn(cdeHelper, 'getDashboardPath').and.callThrough();
    cdeHelper.getDashboardPath('some/path');

    expect(UrlInterpolator).toHaveBeenCalledWith(':basePath/api/:endpoint', {
      basePath: '/pentaho/plugin/pentaho-cdf-dd',
      endpoint: 'renderer/getDashboard',
      path: 'some/path'
    });
  }));
});
