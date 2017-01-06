'use strict';

// server-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const serverSchema = new Schema({
  server_name: { type: String, required: true },
  address: { type: String, required: true },
  user: { type: String, required: true },
  private_key: { type: String, required: true },
  sudo: { type: Boolean, required: true },
  modules: {type: Array, requred: true, default: []},
  createdAt: { type: Date, 'default': Date.now },
  updatedAt: { type: Date, 'default': Date.now }
});

const serverModel = mongoose.model('server', serverSchema);

module.exports = serverModel;
