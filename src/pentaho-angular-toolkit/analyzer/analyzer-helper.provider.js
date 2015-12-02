(function(angular) {
  'use strict';

  var extend = angular.extend;
  var isString = angular.isString;
  var isFunction = angular.isFunction;

  angular.module('pat.analyzer')
      .provider('AnalyzerHelper', AnalyzerHelperProvider)
      .config(config);

  config.$inject = ['AnalyzerHelperProvider'];
  function config(AnalyzerHelperProvider) {
    AnalyzerHelperProvider.setBasePath('/pentaho/api/repos/xanalyzer');
  }

  /* @ngInject */
  AnalyzerHelperProvider.$inject = ['UrlInterpolator'];
  function AnalyzerHelperProvider(UrlInterpolator) {

    var _basePath = '';

    this.setBasePath = setBasePath;

    function setBasePath(path) {
      _basePath = path;
    }

    function getBasePath() {
      return _basePath;
    }

    function getAnalysisPath(config) {
      var url = ':basePath/:endpoint';
      var params = {
        basePath: getBasePath(),
        endpoint: 'editor'
      };
      params = extend(params, config);
      return UrlInterpolator(url, params).getUrl;
    }

    this.$get = AnalyzerHelper;

    AnalyzerHelper.$inject = ['$window'];
    function AnalyzerHelper($window) {
      var onLoadHandlers = {};

      var service = {
        getLoadHandlers: getLoadHandlers,
        getAnalysisPath: getAnalysisPath,
        registerOnLoad: registerOnLoad,
        deregisterOnLoad: deregisterOnLoad
      };

      initOnLoad();

      return service;

      //////////////

      function getLoadHandlers(){
        return onLoadHandlers;
      }

      function registerOnLoad(frameId, callback) {
        if (isString(frameId) && isFunction(callback)) {
          onLoadHandlers[frameId] = callback;
        }
      }

      function deregisterOnLoad(frameId) {
        delete onLoadHandlers[frameId];
      }

      function onAnalyzerLoad(api, frameId) {
        if (onLoadHandlers[frameId]) {
          /* jshint validthis: true */
          onLoadHandlers[frameId].apply(this, arguments);
        }
      }

      function initOnLoad() {
        $window.onAnalyzerLoad = onAnalyzerLoad;
      }

    }

  }

})(window.angular);
