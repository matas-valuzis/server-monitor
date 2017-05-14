'use strict';

const path = require('path');
const feathers = require('feathers');
const configuration = require('feathers-configuration');
const hooks = require('feathers-hooks');
const cors = require('cors');

const services = require('./services');

const app = feathers();



app.configure(configuration(path.join(__dirname, '..')));

app
  .configure(hooks())
  .configure(services);


module.exports = app;
