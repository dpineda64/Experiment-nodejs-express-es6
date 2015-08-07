/* eslint-disable key-spacing */

const fs = require('fs');
const path = require('path');

const config = {
  domain: process.env.DOMAIN || 'localhost',
  port: process.env.PORT || 3000,
  certFile: process.env.CERT || '',
  keyFile: process.env.KEY || '',
  secretFile: process.env.SECRET || path.join(__dirname, '/secret_session'),
  SystemPath: path.join(__dirname, '/System');
  cert: '',
  key: '',
  loginURL: '/login',
  callBackUrl: '/login/callback'
};

if (config.domain !== 'localhost'){
  config.cert = fs.readFileSync(config.certFile, 'utf-8');
  config.key  = fs.readFileSync(config.keyFile, 'utf-8');
}

module.exports = config;
