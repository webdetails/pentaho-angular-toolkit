describe('Directive: analyzerViewDirective', function () {

    var $scope, $compile, element, analyzerHelper;

    beforeEach(function () {

        module('pat.analyzer', function ($provide) {

            $provide.value('AnalyzerHelper', {
                registerOnLoad: jasmine.createSpy('registerSpy').and.callThrough(),
                getAnalysisPath: jasmine.createSpy('loadSpy').and.callThrough()
            })
        })

        inject(function ($rootScope, _$compile_, _AnalyzerHelper_) {

            $scope = $rootScope.$new();
            $compile = _$compile_;

            analyzerHelper = _AnalyzerHelper_;

            element = $compile('<pat-analyzer-view config="config" on-load="onLoad(api, frameId)"/>')($scope);

            $scope.config = "someConfig";
            $scope.onLoad = jasmine.createSpy('onLoad');

            $scope.$digest();
        })
    });

    it('should have a scope on root element', function() {
        expect(element.isolateScope()).toBeDefined();
        expect(element.isolateScope().$id).not.toEqual($scope.$id);
    });

    it('should ask helper service to get a path', function () {
        expect(analyzerHelper.getAnalysisPath).toHaveBeenCalledWith('someConfig');
    });

    it('should ask helper service to register frame id and load handler callback', function () {
        var frameId = analyzerHelper.registerOnLoad.calls.mostRecent().args[0];
        var callback = analyzerHelper.registerOnLoad.calls.mostRecent().args[1];
        expect(analyzerHelper.registerOnLoad).toHaveBeenCalledWith(frameId, callback);
    });

    it('should pass parameters to directive on helper service callback call', function () {
        var callback = analyzerHelper.registerOnLoad.calls.mostRecent().args[1];
        callback('someApi', 'someFrameId');
        expect($scope.onLoad).toHaveBeenCalledWith('someApi', 'someFrameId');
    });
});