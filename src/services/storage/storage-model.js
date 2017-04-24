'use strict';

// server-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const storageSchema = new Schema({
    server: {
        type: String,
        required: true
    },
    used_inodes: {
        type: Number,
        required: true
    },
    used_space: {
        type: Number,
        required: true
    },
    createdAt: { type: Date, 'default': Date.now }
});

const storageModel = mongoose.model('storage', storageSchema);

module.exports = storageModel;
