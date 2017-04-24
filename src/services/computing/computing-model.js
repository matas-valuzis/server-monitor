'use strict';

// server-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const computingSchema = new Schema({
    server: {
        type: String,
        required: true
    },
    used_cpu: {
        type: Number,
        required: true
    },
    used_ram: {
        type: Number,
        required: true
    },
    tasks: {
        type: Number,
        required: true
    },
    createdAt: { type: Date, 'default': Date.now }
});

const computingModel = mongoose.model('computing', computingSchema);

module.exports = computingModel;
