'use strict';

const assert = require('assert');
const app = require('../../../src/app').services;

describe('computing service', function() {
  const computing = {
      server: 'test',
      used_cpu: 10,
      used_ram: 1000,
      tasks: 10,
  };

  let computingEntity = {};

  it('creates new record', () => {
      app.service('computing').create(computing).then(
          s => {
            computingEntity = s;
            assert(s._id);
          }
      );
  });

  it('finds new record', () => {
      app.service('computing').find({server: computing.server}).then(
          res => {
              assert(res.length > 0);
              assert(res[0]._id == computingEntity._id);
          }
      );
  });

  it('remove new record', () => {
      app.service('computing').remove(computingEntity._id).then(assert);
  });
});
