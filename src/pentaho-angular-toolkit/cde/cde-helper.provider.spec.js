describe('Provider: cdeHelperProvider', function() {
  'use strict';

  var cdeHelper;
  var cdeHelperProvider;

  beforeEach(function() {

    module('pat.utils');

    module('pat.cde', function(_CdeHelperProvider_) {
      cdeHelperProvider = _CdeHelperProvider_;
    });

    inject(function(_CdeHelper_) {
      cdeHelper = _CdeHelper_;
    });
  });

  describe('base path getter and setter', function() {
    it('should exist', function() {
      expect(cdeHelperProvider.setBasePath).toBeDefined();
      expect(cdeHelperProvider.getBasePath).toBeDefined();
    });

    it('should store the base path value internally in the provider', function() {
      cdeHelperProvider.setBasePath('some/path');
      expect(cdeHelperProvider.getBasePath()).toBe('some/path');
      cdeHelperProvider.setBasePath('another/path');
      expect(cdeHelperProvider.getBasePath()).not.toBe('some/path');
    });
  });

  describe('dashboard path service method', function() {

    it('should return the dashboard url based on the dashboard repo path.', function() {
      var dashboardPath = 'path/to/dashboard.wcdf';
      var fullPath = cdeHelperProvider.getBasePath() + '/api/renderer/getDashboard?path=' + dashboardPath;

      expect(cdeHelper.getDashboardPath(dashboardPath)).toBe(fullPath);
    });
  });
});
