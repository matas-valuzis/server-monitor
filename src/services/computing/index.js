'use strict';

const service = require('feathers-mongoose');
const computing = require('./computing-model');
const hooks = require('./hooks');

module.exports = function() {
  const app = this;

  const options = {
    Model: computing,
    Id: 'id',
    paginate: {
      default: 5,
      max: 25
    }
  };

  // Initialize our service with any options it requires
  app.use('/computing', service(options));

  // Get our initialize service to that we can bind hooks
  const computingService = app.service('/computing');

  // Set up our before hooks
    computingService.before(hooks.before);

  // Set up our after hooks
    computingService.after(hooks.after);
};
