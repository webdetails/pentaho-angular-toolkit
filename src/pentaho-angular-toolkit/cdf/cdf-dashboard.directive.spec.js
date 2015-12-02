'use strict';

describe('Directive: cdfDashboardDirective', function() {

  var scope, compile, controllerMock, dashMock, element;

  function getCompiledElement(scope) {
    var elem, compiledElem;
    elem = angular.element('<pat-cdf-dashboard path="{{path}}" events="events" parameters="parameters" ></pat-cdf-dashboard>');
    compiledElem = compile(elem)(scope);
    scope.$digest();

    return compiledElem;
  }

  beforeEach(function() {

    // load the controller's module
    module('pat.cdf', function($provide, $controllerProvider) {
      $controllerProvider.register('CdfDashboardController', function() {
        this.setNewDashboard = controllerMock.setNewDashboard;
        this.render = controllerMock.render;
      });
    });

    // Initialize the controller and a mock scope
    inject(function($compile, $rootScope) {
      compile = $compile;
      scope = $rootScope.$new();
    });

    controllerMock = jasmine.createSpyObj('controllerMock', ['setNewDashboard' , 'render']);
    dashMock = jasmine.createSpyObj('dashMock', ['listenTo' , 'fireChange' , 'setParameter' , 'getParameterValue']);

    inject(function($q) {
      controllerMock.setNewDashboard.and.callFake(function() {
        var deferred = $q.defer();
        deferred.resolve(dashMock);
        return deferred.promise;
      });
      controllerMock.render.and.callFake(function(d) { return d; });
    });

    element = getCompiledElement(scope);

  });

  it('should have a scope on root element', function() {
    expect(element.isolateScope()).toBeDefined();
    expect(element.isolateScope().$id).not.toEqual(scope.$id);
  });

  describe('path change handler', function() {

    beforeEach(function() {
      scope.objParam = {};
      scope.parameters = {p1: '"a"' , p2: '0' , p3: 'objParam'};
      scope.events = {p1: 'callback1(name,data)' , p2: 'callback2(name,data)'};
      scope.path = 'myPath';
      scope.callback1 = jasmine.createSpy('callback1');
      scope.callback2 = jasmine.createSpy('callback2');

      getCompiledElement(scope);

      dashMock.fireChange.calls.reset();
      dashMock.setParameter.calls.reset();
    });

    it('should ask the controller to set a new dashboard', function() {
       getCompiledElement(scope);
       expect(controllerMock.setNewDashboard).toHaveBeenCalledWith(scope.path , element);
     });

    it('should initialize the parameters in the dashboard', function() {
      getCompiledElement(scope);

      var numberParams = 3, paramValue, paramName;
      var calls = dashMock.setParameter.calls.allArgs();

      expect(dashMock.setParameter.calls.count()).toEqual(numberParams);
      for (var i = 0 ; i < numberParams; i++) {
        paramName = calls[i][0];
        paramValue = scope.$eval(scope.parameters[paramName]);
        expect(paramValue).toBe(calls[i][1]);
      }
    });

    it('should register the events in the dashboard', function() {
      getCompiledElement(scope);

      expect(dashMock.listenTo).toHaveBeenCalledWith(dashMock,'all',jasmine.any(Function));
      var callback = dashMock.listenTo.calls.mostRecent().args[2];

      callback('p1' , 'A');
      expect(scope.callback1).toHaveBeenCalledWith('p1' , 'A');
      callback('p1' , 1);
      expect(scope.callback1).toHaveBeenCalledWith('p1' , 1);
      callback('p2', 'A');
      expect(scope.callback2).toHaveBeenCalledWith('p2' , 'A');

    });

    it('should ask the controller to render the dashboard', function() {
      getCompiledElement(scope);
      expect(controllerMock.render).toHaveBeenCalledWith(dashMock);
    });

    it('should register watchers for parameter expressions', function() {
      var dashboardParameters = {};

      dashMock.setParameter.and.callFake(function(name, value) {
        dashboardParameters[name] = value;
      });
      dashMock.getParameterValue.and.callFake(function(name) {
        return dashboardParameters[name];
      });
      dashMock.fireChange.and.callFake(function(name, value) {
        dashboardParameters[name] = value;
      });

      scope.parameters = {};
      getCompiledElement(scope);

      expect(dashMock.fireChange.calls.count()).toBe(0);

      scope.parameters = {p1: '"b"' , p2: '0'};
      dashMock.fireChange.calls.reset();
      getCompiledElement(scope);

      var numberParams = 2, paramName, paramValue;
      var calls = dashMock.fireChange.calls.allArgs();

      expect(dashMock.fireChange.calls.count()).toBe(2);
      for (var i = 0 ; i < numberParams; i++) {
        paramName = calls[i][0];
        paramValue = scope.$eval(scope.parameters[paramName]);
        expect(paramValue).toBe(calls[i][1]);
      }

      scope.parameters = {p1: '"a"' , p2: '0'};
      dashMock.fireChange.calls.reset();
      getCompiledElement(scope);

      expect(dashMock.fireChange.calls.count()).toBe(1);
      expect(dashMock.fireChange).toHaveBeenCalledWith('p1' , 'a');

    });

  });

});
