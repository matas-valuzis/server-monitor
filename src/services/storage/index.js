'use strict';

const service = require('feathers-mongoose');
const storage = require('./storage-model');
const hooks = require('./hooks');

module.exports = function() {
  const app = this;

  const options = {
    Model: storage,
    id: 'id',
    paginate: {
      default: 5,
      max: 1000
    }
  };

  // Initialize our service with any options it requires
  app.use('/storage', service(options));

  // Get our initialize service to that we can bind hooks
  const storageService = app.service('/storage');

  // Set up our before hooks
    storageService.before(hooks.before);

  // Set up our after hooks
    storageService.after(hooks.after);
};
