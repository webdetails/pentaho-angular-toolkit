(function(angular) {
  'use strict';

  var forEach = angular.forEach;
  var isFunction = angular.isFunction;
  var equals = angular.equals;

  angular.module('pat.cdf')
      .directive('patCdfDashboard', cdfDashboard);

  // TODO: Add attribute version for single parameter / single event.

  /**
   * @ngdoc directive
   * @name pat.cdf.directive:patCdfDashboard
   * @scope
   * @restrict EA
   *
   * @param {string} path A url from where the dashboard definition should be fetched.
   * @param {object=} parameters A map or expressions to bind to dashboard parameters.
   * @param {object=} events A map of expressions to run when a dashboard event is fired.
   * These are usually callback functions.
   * @param {boolean=} deep-watch An expression that, when evaluated, controls whether the
   * parameter expressions should watch deeply or shallowly.
   */
  cdfDashboard.$inject = ['$parse'];
  function cdfDashboard($parse) {
    var directive = {
      bindToController: true,
      controller: 'CdfDashboardController',
      controllerAs: 'vm',
      restrict: 'EA',
      scope: {
        'path': '@',
        'getParameters': '&parameters',
        'getEvents': '&events',
        'isDeepWatch': '&deepWatch'
      },
      link: postLink
    };

    /* @ngInject */

    function postLink(scope, element, attrs, controller) {
      var _watcher;

      scope.$watch(function() {
        return controller.path;
      }, handlePathChange);

      function handlePathChange(newPath) {
        if (newPath) {
          clearWatcher();
          controller.setNewDashboard(newPath, element)
              .then(setParameters)
              .then(addEventsDispatcher)
              .then(controller.render)
              .then(addParametersWatcher)
          ;
        }
      }

      function addParametersWatcher(dash) {
        _watcher = scope.$watchCollection(function() {
          return controller.getParameters();
        }, handleParametersChange, isDeepWatch());

        function handleParametersChange(newParameters) {
          forEach(newParameters, function(expression, name) {
            var value = scope.$parent.$eval(expression);
            if (!equals(value, dash.getParameterValue(name))) {
              dash.fireChange(name, value);
            }
          });
        }

        return dash;
      }

      function addEventsDispatcher(dash) {
        dash.listenTo(dash, 'all', function(eventName, eventData) {
          var callbacks = controller.getEvents() || {};
          if (callbacks[eventName]) {
            $parse(callbacks[eventName])(scope.$parent, {
              name: eventName,
              data: eventData
            });
          }
        });
        return dash;
      }

      function clearWatcher() {
        if (isFunction(_watcher)) {
          _watcher();
          _watcher = undefined;
        }
      }

      function setParameters(dash) {
        forEach(controller.getParameters(), function(expression, name) {
          var value = scope.$parent.$eval(expression);
          dash.setParameter(name, value);
        });
        return dash;
      }

      function isDeepWatch() {
        return !!controller.isDeepWatch();
      }

    }

    postLink.$inject = ['scope', 'element', 'attrs', 'controller'];

    return directive;
  }

})(window.angular);
