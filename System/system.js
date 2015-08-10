/*jslint node: true , esnext: true*/
/* eslint-disable key-spacing */

'use strict';

const fs = require('fs');
const path = require('path');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const helmet = require('helmet');
const csfr = require('csurf');
const session = require('express-session');
const mongoose = require('mongoose');
const config = require('../config');

// Express Setup
const app = express();

// Globals
global._config = config;

// Mongoose Setup
mongoose.connect(config.database.url);

app.use(morgan(process.env.LOGFORMAT || 'dev'));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json({type: 'application/json'}));
app.use(cookieParser());
app.use(express.static(config.mainPath + '/public'));

// csurf Setup
const csfrValue = (req) => {
  const token = (req.body && req.csrfToken())
        || (req.query && req.query._csrf)
        || (req.headers['x-csfr-token'])
        || (req.headers['x-xsrf-token']);
  return token;
};

// Session Setup
app.use(session({
  secret: fs.readFileSync(config.secretFile, 'utf-8'),
  secure: false
}));

// Helmet Setup
app.use(helmet.hidePoweredBy());

// Example Route
//const routes = require('./routes/index');
// app.use('/', routes);


// Modules Helper
require('./Helpers/modules')(app, config);

// Error handling setup
app.use((req, res, next) => {
  let err = new Error('not found');
  err.status = 404;
  next(err);
});

app.use((req, res, next) => {
  let stack = app.get('env') === 'development' ? err.stack : {};
  let msg = {message: err.message, error: stack};

  res.send(err.status || 500).json(msg);
});

module.exports = app;
