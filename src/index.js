'use strict';
var fs = require('fs-extra');
var args = require('minimist')(process.argv.slice(2));

//create config files
const configDef = 'config/default.json';
const configDefDist = 'config/default.json.dist';
const configProd = 'config/production.json';
const configProdDist= 'config/production.json.dist';

if (!fs.existsSync(configDef)) {
    fs.copySync(configDefDist, configDef)
}
if (!fs.existsSync(configProd)) {
    fs.copySync(configProdDist, configProd)
}
require('./commands')(args);
