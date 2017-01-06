'use strict';

const assert = require('assert');
const app = require('../../../src/app');

describe('keys service', function() {
  it('registered the keys service', () => {
    assert.ok(app.service('keys'));
  });
});
