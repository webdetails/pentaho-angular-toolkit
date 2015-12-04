(function(angular) {
  'use strict';

  var extend = angular.extend;
  var isString = angular.isString;
  var isFunction = angular.isFunction;
  var forEach = angular.forEach;

  angular.module('pat.analyzer')
      .provider('AnalyzerHelper', AnalyzerHelperProvider)
      .config(config);

  config.$inject = ['AnalyzerHelperProvider'];
  function config(AnalyzerHelperProvider) {
    AnalyzerHelperProvider.setBasePath('/pentaho/api/repos/xanalyzer');
  }

  /* @ngInject */
  AnalyzerHelperProvider.$inject = [];
  function AnalyzerHelperProvider() {

    var _basePath = '';

    this.setBasePath = setBasePath;
    this.getBasePath = getBasePath;

    function setBasePath(path) {
      _basePath = path;
    }

    function getBasePath() {
      return _basePath;
    }

    /**
     * @ngdoc method
     * @name pat.analyzer.service:AnalyzerHelper#getAnalysisPath
     * @methodOf pat.analyzer.service:AnalyzerHelper
     * @description something something
     *
     * @param {object} config something something
     *
     * @returns {string} something something
     */
    function getAnalysisPath(config) {
      var url = getBasePath() + '/editor';
      var isFirst = true;
      forEach(config, function(key, value){
        url += (isFirst ? '?' : '&') + key + '=' + value;
        isFirst = false;
      });
      return url;
    }

    this.$get = AnalyzerHelper;

    /**
     * @ngdoc service
     * @name pat.analyzer.service:AnalyzerHelper
     */
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

      function getLoadHandlers() {
        return onLoadHandlers;
      }

      /**
       * @ngdoc method
       * @name pat.analyzer.service:AnalyzerHelper#registerOnLoad
       * @methodOf pat.analyzer.service:AnalyzerHelper
       * @description something something
       *
       * @param {string} frameId something something
       * @param {function} callback something something
       *
       */
      function registerOnLoad(frameId, callback) {
        if (isString(frameId) && isFunction(callback)) {
          onLoadHandlers[frameId] = callback;
        }
      }

      /**
       * @ngdoc method
       * @name pat.analyzer.service:AnalyzerHelper#deregisterOnLoad
       * @methodOf pat.analyzer.service:AnalyzerHelper
       * @description something something
       *
       * @param {string} frameId something something
       *
       */
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
