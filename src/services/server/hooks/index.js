'use strict';

const globalHooks = require('../../../hooks');
const hooks = require('feathers-hooks');
const auth = require('feathers-authentication').hooks;

exports.before = {
  all: [
    auth.verifyToken(),
    auth.populateUser(),
    auth.restrictToAuthenticated()
  ],
  find: [],
  get: [],
  create: [],
  update: [],
  patch: [],
  remove: []
};

exports.after = {
  all: [],
  find: [],
  get: [
      (hook, next) => {
        let options = hook.params.query;
        if (options.checkifconnected){
            let server = hook.result.toObject();
            hook.app.service('/connected')
                .get(server)
                .then((res) => {
                  hook.result = res;
                  next();
              })

        }
      }

  ],
  create: [],
  update: [],
  patch: [],
  remove: []
};
