'use strict';

const assert = require('assert');
const app = require('../../../src/app');

describe('server service', function() {
  it('registered the servers service', () => {
    assert.ok(app.service('servers'));
  });
});
