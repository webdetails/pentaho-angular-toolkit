'use strict';

var $	 		= require('../gulp.config.js');
var gulp		= require('gulp');
var bump		= require('gulp-bump');
var argv 		= require('yargs').argv;

/**
 * Bump the version and update *.json version
 * --type=pre will bump the prerelease version *.*.*-x
 * --type=patch or no flag will bump the patch version *.*.x
 * --type=minor will bump the minor version *.x.*
 * --type=major will bump the major version x.*.*
 * --version=1.2.3 will bump to a specific version and ignore other flags
 *
 * @return {Stream}
 */
module.exports = function() {
  $.log('Bumping and updating version in *.json files');

  var version = argv.version ? {version: argv.version}  : null;
  var type 	= argv.type ? {type: argv.type}  : '';

  return gulp.src('./*.json')
      .pipe(bump(version ? version : type))
      .pipe(gulp.dest('./'));
};
