  'use strict';

  describe('Directive: cdfDashboardDirective', function () {

    var scope, compile, element;

    beforeEach(function() {

      // load the controller's module
      module('pat.cdf');

      // Initialize the controller and a mock scope
      inject(function ($compile, $rootScope) {
        compile=$compile;
        scope=$rootScope.$new();
        scope.path = 'path';
      });

      element = getCompiledElement();
    });

    function getCompiledElement() {
      var elem, compiledElem;
      elem = angular.element('<pat-cdf-dashboard path="myPath"></pat-cdf-dashboard>');
      compiledElem = compile(elem)(scope);
      scope.$digest();

      return compiledElem;
    }

    it('should have a scope on root element', function () {
      expect(element.isolateScope()).toBeDefined();
      expect(element.isolateScope().$id).not.toEqual(scope.$id);
    });

    it('path on isolated scope should be one-way bound', function(){
      var isolatedScope = element.isolateScope();
      isolatedScope.myPath = 'path1';

      console.log(element.find('pat-cdf-dashboard'));

      expect(scope.path).toEqual('path');
    });

  });