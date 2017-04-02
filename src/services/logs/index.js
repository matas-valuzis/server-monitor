'use strict';

const service = require('feathers-memory');
const hooks = require('./hooks');

module.exports = function() {
  const app = this;

  const options = {
    paginate: {
      default: 100,
      max: 100
    }
  };

  // Initialize our service with any options it requires
  app.use('/logs', service(options));

  // Get our initialize service to that we can bind hooks
  const logService = app.service('/logs');

  // Set up our before hooks
    logService.before(hooks.before);

  // Set up our after hooks
    logService.after(hooks.after);
};
