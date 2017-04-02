'use strict';
const keys = require('./keys');
const server = require('./server');
const authentication = require('./authentication');
const user = require('./user');
const con = require('./connected');
const logs = require('./logs');
const mongoose = require('mongoose');
module.exports = function() {
  const app = this;

  mongoose.connect(app.get('mongodb'));
  mongoose.Promise = global.Promise;

  app.configure(authentication);
  app.configure(user);
  app.configure(server);
  app.configure(keys);
  app.configure(con);
  app.configure(logs);
};
