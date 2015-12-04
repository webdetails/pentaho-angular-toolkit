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
     * @description This method takes a configuration object for analyzer and returns the
     * url that should be called to create an analyzer view with that configuration.
     *
     * @param {object} config A configuration object with parameters controlling some initialization
     * aspects of an analyzer frame.
     *
     * @returns {string} The url corresponding to the configuration specified on the configuration object.
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
     * @description The AnalyzerHelper service acts as an abstraction layer so
     * that controllers and directives don't have to directly interface with
     * {@link https://help.pentaho.com/Documentation/6.0/0L0/120/030 Pentaho Analyzer}.
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

      /**
       * @ngdoc method
       * @name pat.analyzer.service:AnalyzerHelper#getLoadHandlers
       * @methodOf pat.analyzer.service:AnalyzerHelper
       * @description Retrieves the container of all the registered callbacks..
       *
       * @returns {object} The map of registered callbacks.
       */
      function getLoadHandlers() {
        return onLoadHandlers;
      }

      /**
       * @ngdoc method
       * @name pat.analyzer.service:AnalyzerHelper#registerOnLoad
       * @methodOf pat.analyzer.service:AnalyzerHelper
       * @description Registers a callback function to be called when the analyzer view with the
       * specified frameId triggers the onLoad event.
       *
       * @param {string} frameId A string identifying the frameId of an analyzer view.
       * @param {function} callback The callback to run when the view the the specified frameId loads.
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
       * @description Removes the registered callback for the specified frameId.
       *
       * @param {string} frameId A string indentifying the frameId for which to remove the callback.
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
