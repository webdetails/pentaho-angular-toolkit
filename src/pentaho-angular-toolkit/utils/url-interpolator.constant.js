(function(angular) {
  'use strict';

  var copy = angular.copy;
  var forEach = angular.forEach;

  angular.module('pat.utils')
      .constant('UrlInterpolator', interpolateUrl);

  function interpolateUrl(url, params, data) {
    params = copy(params || {});
    data = copy(data || {});
    url = url
        .replace(/(\(\s*|\s*\)|\s*\|\s*)/g, '')
        // Replace url parameters
            .replace(/:([a-z]\w*)/gi, function($0, label) {
              // NOTE: Giving 'data' precedence over 'params'.
              return (popFirstKey(data, params, label) || '');
            })
            // Strip out any repeating slashes (but NOT the http:// version).
            .replace(/(^|[^:])[\/]{2,}/g, '$1/')
            // Strip out any trailing slash.
            .replace(/\/+$/i, '');

    return {
      getUrl: url + (params ? '?' + getQueryParameters(params) : ''),
      url: url,
      params: params,
      data: data
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
