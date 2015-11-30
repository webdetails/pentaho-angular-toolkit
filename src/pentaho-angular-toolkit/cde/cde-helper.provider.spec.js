describe('Provider: cdeHelperProvider', function () {

  var cdeHelper;

  // excuted before each "it" is run.
  beforeEach(function (){

    module('pat.utils', function($provide){
      $provide.constant('UrlInterpolator', {});
    })

    // load the module.
    module('pat.cde');

    // inject your provider for testing.
    inject(function(_CdeHelper_) {
      cdeHelper = _CdeHelper_;
    });
  });

  it('...', function () {

    console.log(cdeHelper);
  });
});