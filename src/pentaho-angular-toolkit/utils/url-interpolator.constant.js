(function(angular) {
  'use strict';

  var copy = angular.copy;
  var forEach = angular.forEach;

  angular.module('pat.utils')
      .constant('UrlInterpolator', interpolateUrl);

  /**
   * @ngdoc function
   * @name pat.utils.service:UrlInterpolator
   * @description Provides an url interpolator service, modifying a supplied url
   * template according to a parameters map and a data map.
   *
   * The interpolator will use the
   * parameters map and the data map to replace tokens in the url, and it will
   * return:
   *  - the interpolated url,
   *  - the remaining parameters,
   *  - the remaining data
   *  - another url including all the remaining parameters in the url string, for use in a
   * GET call.
   *
   * Tokens are of the form ':paramName'.
   *
   * @param {string} url Url to use as interpolating template.
   * @param {object} params Parameters map.
   * @param {object} data Data map.
   *
   * @returns {object} Object consisting of 4 things:
   * - url: the interpolated url, with tokens replaced when found in params or data arguments.
   * - getUrl: the same as the url but with remaining parameters after interpolation added to the url.
   * - params: remaining params map. Does not included the keys used in tokens.
   * - data: remaining data map. Does not included the keys used in tokens.
   */
  function interpolateUrl(url, params, data) {
    var _params = copy(params || {});
    var _data = copy(data || {});
    var _url = url
        .replace(/(\(\s*|\s*\)|\s*\|\s*)/g, '')
        // Replace url parameters
            .replace(/:([a-z]\w*)/gi, function($0, label) {
              // NOTE: Giving 'data' precedence over 'params'.
              return (popFirstKey(_data, _params, label) || '');
            })
            // Strip out any repeating slashes (but NOT the http:// version).
            .replace(/(^|[^:])[\/]{2,}/g, '$1/')
            // Strip out any trailing slash.
            .replace(/\/+$/i, '');

    return {
      getUrl: _url + (_params ? '?' + getQueryParameters(_params) : ''),
      url: _url,
      params: _params,
      data: _data
    };
  }

  function getQueryParameters(params) {
    var paramStrings = [];
    forEach(params, function(value, key) {
      paramStrings.push(key + '=' + value);
    });
    return paramStrings.join('&');
  }

  // Arguments: object1, object2, ... , objectN, key
  function popFirstKey() {

    var objects = Array.prototype.slice.call(arguments);
    var key = objects.pop();

    var object = null;

    while (!!(object = objects.shift())) {
      if (object.hasOwnProperty(key)) {
        return (popKey(object, key));
      }
    }

  }

  // I delete the key from the given object and return the value.
  function popKey(object, key) {
    var value = object[key];
    delete(object[key]);

    return (value);

  }

})(window.angular);
