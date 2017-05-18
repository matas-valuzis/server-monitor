'use strict';

const assert = require('assert');
const app = require('../../../src/app').services;

describe('server service', function() {
  const server = {
      server_name: 'test',
      address: 'test.com',
      user: 'admin',
      private_key: 'test',
      sudo: true,
  };

  let serverEntity = {};

  it('creates new server', () => {
      app.service('servers').create(server).then(
          s => {
            serverEntity = s;
            assert(s._id);
          }
      );
  });

  it('finds new server', () => {
      app.service('servers').find({server_name: server.name}).then(
          res => {
              assert(res.length > 0);
              assert(res[0]._id == serverEntity._id);
          }
      );
  });

  it('remove new server', () => {
      app.service('servers').remove(serverEntity._id).then(assert);
  });
});
