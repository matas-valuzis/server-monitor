'use strict';

const service = require('feathers-mongoose');
const server = require('./server-model');
const hooks = require('./hooks');

module.exports = function() {
  const app = this;

  const options = {
    Model: server,
    paginate: {
      default: 5,
      max: 25
    }
  };

  // Initialize our service with any options it requires
  app.use('/servers', service(options));

  // Get our initialize service to that we can bind hooks
  const serverService = app.service('/servers');

  // Set up our before hooks
  serverService.before(hooks.before);

  // Set up our after hooks
  serverService.after(hooks.after);
};
