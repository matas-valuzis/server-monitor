'use strict';

const Service  = require('feathers-mongoose').Service;
const storage = require('./storage-model');
const hooks = require('./hooks');
const avg = require('./avg-per-day');

module.exports = function() {
  const app = this;

  const options = {
    Model: storage,
    id: 'id',
    paginate: {
      default: 1000,
      max: 1000
    }
  };

  class Storage extends Service{
      find(params){
        if (params.query.history){
            return avg(this.Model);
        }
        return super.find(params);
      }
  }

    // Initialize our service with any options it requires
  app.use('/storage', new Storage(options));

  // Get our initialize service to that we can bind hooks
  const storageService = app.service('/storage');

  // Set up our before hooks
    storageService.before(hooks.before);

  // Set up our after hooks
    storageService.after(hooks.after);
};
