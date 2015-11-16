'use strict';

module.exports = function(config) {
  config.set({
    browsers: ['PhantomJS'],
    frameworks: ['jasmine'],
    files: [
      'src/*.js',
      'src/*.spec.js'
    ]
  });
};