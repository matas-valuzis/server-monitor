'use strict';

var args = require('minimist')(process.argv.slice(2));
require('./commands')(args);
