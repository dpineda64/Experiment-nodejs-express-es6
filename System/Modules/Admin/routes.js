/* jshint node: true , esnext: true*/

const express = require('express');
const route = express.Router();
const isLoggedIn = require(_config.SystemPath+'/Helpers/interceptors').isLoggedIn;

route.get('/', isLoggedIn ,(req, res) => {
  res.send('works');
});

export default route;
