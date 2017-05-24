'use strict';

const Service = require('feathers-mongoose').Service;
const computing = require('./computing-model');
const hooks = require('./hooks');
const avg = require('./avg-per-day');

module.exports = function() {
  const app = this;

  const options = {
    Model: computing,
    Id: 'id',
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
  app.use('/computing', new Storage(options));

  // Get our initialize service to that we can bind hooks
  const computingService = app.service('/computing');

  // Set up our before hooks
    computingService.before(hooks.before);

  // Set up our after hooks
    computingService.after(hooks.after);
};
