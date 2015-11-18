# Pentaho Angular Toolkit

Angular toolkit to Pentaho CTools dashboards.

## Installing

 - `npm install --save pentaho-angular-toolkit` 
 - `bower install --save pentaho-angular-toolkit`

## Usage

## Requirements 

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

## License

MPL 2.0