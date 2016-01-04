# Pentaho Angular Toolkit

Angular toolkit to Pentaho Platform components.

## Installing

 - `npm install --save pentaho-angular-toolkit` 
 - `bower install --save pentaho-angular-toolkit`

## Documentation

Check [Technical Documentation](http://webdetails.github.io/pentaho-angular-toolkit) for more information
on the modules and components of the library.

## Requirements

The main dependency is, essentially, [angularJS](http://angularjs.org).

Additionally, the cdf dashboard service makes use of [requireJS](http://requirejs.org) to
assynchronously load the dashboard constructor, and assumes the 'require' global is present
in the window object.

Most of the times the constructor dependencies also rely on certain requireJS
configurations, that should be defined in the application. See this link for more information
on the requirements to embed pentaho cdf dashboards:
[CDF Embedding](http://redmine.webdetails.org/projects/cdf/wiki/RequireJS#Embedded-Capabilities).

## Building

### Building Production Code

- `gulp build` - Build the production code to the dist and module folders.

### Code Analysis

- `gulp vet` - Performs static code analysis on all javascript files. Runs jshint and jscs.

### Testing

- `gulp karma` - Runs all unit tests using karma runner.
- `gulp test` - Runs `vet` and `karma` tasks in sequence.

### Cleaning Up

- `gulp clean` - Removes all files from the dist and tmp folders.

### Angular 

- `gulp angular` - Optimizes all angular files and move them to dist folder.

### Bumping Versions

- `gulp bump` - Bump the minor version using semver.
    --type=patch // default
    --type=minor
    --type=major
    --type=pre
    --version=1.2.3 // specific version

- `gulp release` - Bump the version and runs `module` task to rebuild module dist folder. This task is to be used by Travis Ci, to dynamically bump the module version according to tag release number.


## Versioning

Version follows Pentaho major and minor version numbers. Patch number is independent.

## License

MPL 2.0