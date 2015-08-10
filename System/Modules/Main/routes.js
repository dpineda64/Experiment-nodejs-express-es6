/*jslint node: true , esnext: true*/
'use strict';

const express = require('express');
const routes = express.Router();

routes.get('/', (req, res) => {
  res.sendFile('index.html', {root: 'dist'});
});


module.exports = routes;
