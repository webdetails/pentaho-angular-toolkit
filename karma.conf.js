'use strict';

module.exports = function(config) {
  config.set({

    browsers: ['PhantomJS'],

    frameworks: ['jasmine'],

    files: [
      'node_modules/angular/angular.js',
      'node_modules/angular-mocks/angular-mocks.js',
      'src/pentaho-angular-toolkit/**/*.module.js',
      'src/pentaho-angular-toolkit/**/*.js'
    ]
  });
};