/*! ******************************************************************************
 *
 * Pentaho
 *
 * Copyright (C) 2026 by Pentaho Canada Inc. : http://www.pentaho.com
 *
 * Use of this software is governed by the Business Source License included
 * in the LICENSE.TXT file.
 *
 * Change Date: 2030-06-15
 ******************************************************************************/
describe('Constant: uuid', function() {
  'use strict';

  var uuid;

  beforeEach(function() {
    // Load the constant's module
    module('pat.utils');

    inject(function(_uuid_) {
      uuid = _uuid_;
    });
  });

  it('should exist', function() {
    expect(!!uuid).toBe(true);
  });

  it('should generate unique uuid', function() {

    var results = [];
    for (var x = 0; x < 100; x++) {
      var result = uuid();
      var exists = results.indexOf(result);
      results.push(result);

      expect(exists).toBe(-1);
    }
  });
});
