'use strict';

const hooks = require('./hooks');

class Service {
  constructor(options) {
    this.options = options || {};
  }

  find(params) {
    return Promise.resolve(['main_rsa']);
  }

}

module.exports = function(){
  const app = this;

  // Initialize our service with any options it requires
  app.use('/keys', new Service());

  // Get our initialize service to that we can bind hooks
  const keysService = app.service('/keys');

  // Set up our before hooks
  keysService.before(hooks.before);

  // Set up our after hooks
  keysService.after(hooks.after);
};

module.exports.Service = Service;
