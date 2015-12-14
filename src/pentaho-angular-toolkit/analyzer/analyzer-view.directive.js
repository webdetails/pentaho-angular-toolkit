(function(angular) {
  'use strict';

  angular.module('pat.analyzer')
    .directive('patAnalyzerView', analyzerView);

  // TODO: Add attribute version for single parameter / single event.

  /**
   * @ngdoc directive
   * @name pat.analyzer.directive:patAnalyzerView
   * @scope
   * @restrict EA
   * @description This directive handles the implementation details of embedding
   * an analyzer view in an application. Standard iframes are used as the supporting
   * technology, so there aren't any particular issues to taken into account when
   * using the directive.
   *
   * @param {object} config An analyzer view configuration object.
   * @param {function=} on-load A function to call when the analyzer view loads.
   */
  analyzerView.$inject = ['AnalyzerHelper', 'uuid'];
  function analyzerView(AnalyzerHelper, uuid) {
    var directive = {
      bindToController: true,
      controller: AnalyzerViewController,
      controllerAs: 'vm',
      restrict: 'EA',
      template: '<iframe ng-src="{{vm.path}}" frameborder="0" id="{{vm.frameId}}" allowfullscreen/>',
      scope: {
        getConfig: '&config',
        onLoad: '&onLoad'
      },
      link: postLink
    };

    /* @ngInject */

    function postLink(scope, element, attrs, controller) {
      controller.frameId = '__ANALYZER__FRAME__' + uuid() + '__';

      scope.$watchCollection(function() {
        return controller.getConfig();
      }, handleConfigChange);

      if (controller.onLoad) {
        AnalyzerHelper.registerOnLoad(controller.frameId, onLoad);
      }

      function handleConfigChange(newConfig) {
        controller.path = AnalyzerHelper.getAnalysisPath(newConfig);
      }

      function onLoad(api, frameId) {
        controller.onLoad({api: api, frameId: frameId});
      }

    }

    postLink.$inject = ['scope', 'element', 'attrs', 'controller'];

    return directive;
  }

  // TODO: Move some of the API to the controller, for sharing with other directives
  AnalyzerViewController.$inject = [];
  function AnalyzerViewController() {

  }

})(window.angular);
