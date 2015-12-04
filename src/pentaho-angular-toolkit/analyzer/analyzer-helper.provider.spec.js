describe('Provider: analyzerHelperProvider', function() {

  var analyzerHelper, analyzerHelperProvider, $window;

  var handlerCallback;

  beforeEach(function() {

    module('pat.utils');

    module('pat.analyzer', function(_AnalyzerHelperProvider_) {
      analyzerHelperProvider = _AnalyzerHelperProvider_;
    });

    inject(function(_AnalyzerHelper_, _$window_) {
      analyzerHelper = _AnalyzerHelper_;
      $window = _$window_;
    });

    handlerCallback = jasmine.createSpy('handlerCallbackSpy').and.callThrough();
  });

  describe('base path getter and setter', function(){
    it('should exist', function() {
      expect(analyzerHelperProvider.setBasePath).toBeDefined();
      expect(analyzerHelperProvider.getBasePath).toBeDefined();
    });

    it('should store the base path value internally in the provider', function(){
      analyzerHelperProvider.setBasePath('some/path');
      expect(analyzerHelperProvider.getBasePath()).toBe('some/path');
      analyzerHelperProvider.setBasePath('another/path');
      expect(analyzerHelperProvider.getBasePath()).not.toBe('some/path');
    });
  });


  it('should populate object with passed values', function() {
    analyzerHelper.registerOnLoad('id1', handlerCallback);
    expect(analyzerHelper.getLoadHandlers()).toEqual(jasmine.objectContaining({
      'id1': handlerCallback
    }));
    expect(analyzerHelper.getLoadHandlers()['id1']).toEqual(handlerCallback);
  });

  it('should remove values from object given key', function() {
    analyzerHelper.registerOnLoad('id2', handlerCallback);
    analyzerHelper.deregisterOnLoad('id2');
    expect(analyzerHelper.getLoadHandlers()).not.toEqual(jasmine.objectContaining({
      'id2': handlerCallback
    }));
  });

  it('tracks that spy was called with passed parameters', function() {
    analyzerHelper.registerOnLoad('id3', handlerCallback);
    $window.onAnalyzerLoad('someAPI', 'id3');
    expect(handlerCallback).toHaveBeenCalledWith('someAPI', 'id3');
  });
});
