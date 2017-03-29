'use strict';
const fs = require('fs');
const path = require('path');
const serveStatic = require('feathers').static;
const favicon = require('serve-favicon');
const compress = require('compression');
const cors = require('cors');
const feathers = require('feathers');
const configuration = require('feathers-configuration');
const hooks = require('feathers-hooks');
const rest = require('feathers-rest');
const bodyParser = require('body-parser');
const socketio = require('feathers-socketio');
const middleware = require('./middleware');
const services = require('./services');
const express = require('express');
//REMOVE FROM PRODUCTION
const webpack = require('webpack');
const config = require('../webpack.config.js');
//BLOCK END

const app = feathers();
const api = feathers();

//REMOVE FROM PRODUCTION

let compiler = webpack(config);
app.use(require('webpack-dev-middleware')(compiler, {
  publicPath: config.output.publicPath
}));
app.use(require('webpack-hot-middleware')(compiler));
//BLOCK END

app.configure(configuration(path.join(__dirname, '..')));


app.use(compress())
    .options('*', cors())
    .use(cors())
    .use(favicon( path.join(app.get('public'), 'favicon.ico') ))
    .use('/', serveStatic( app.get('public') ));

// api config
api.configure(configuration(path.join(__dirname, '..')));

api.use(bodyParser.json())
.use(bodyParser.urlencoded({ extended: true }))
.configure(hooks())
.configure(rest())
.configure(socketio())
.configure(services)
.configure(middleware);

app.use('/api', api);

module.exports = app;
