/*jslint node: true , esnext: true*/
'use strict';

const express = require('express');
const routes = express.Router();
const User = require('./model');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const isLoggedIn = require(_config.SystemPath + '/Helpers/interceptors').isLoggedIn;
//const isloggedinlocal = require(_config.SystemPath + '/Helpers/interceptors').isloggedinlocal;
const auth = require(_config.SystemPath + '/Helpers/auth');

console.log(auth.generateHash('hello'));

routes.get('/', (req, res) => {
  res.send('works');
});

// signup page
routes.get('/signup', (req, res) => {
  res.send('working on page -> signup');
});

routes.post('/signup' , (req , res) => {
  User.findOne({'email ' : req.body.email } , (err , user) => {
    if(err) throw err;
    if(user){
      res.json({message : 'Signup fail! User already exist' , success : false});
    } else {
      const newUser = new User();
      newUser.email = req.body.email;
      newUser.password = auth.generateHash(req.body.password);

      newUser.save((err) => {
        if(err) throw err;
        res.json({message: 'Sucess Signup!' , success: true});
      });
    }
  });
});

routes.post('/authenticate', (req, res) => {
  User.findOne({'name' : req.body.name} , (err, user) => {
    console.log(auth.validPass(req.body.password , user.password));
    if(err) throw err;
    if(!user){
      res.json({message: 'Authentication fail! User not found', success: false});
    }  else  if(user) {
      if(!auth.validPass(req.body.password , user.password)){
        res.json({message: 'Authentication fail! Password wrong' , success: false});
      } else {
        const secret = fs.readFileSync(_config.secretFile, 'utf-8');
        const token = jwt.sign(user , secret , {
          expiresInMinutes: 1440
        });
        res.json({
          success: true,
          message: 'Success Authentication',
          token: token
        });
        //isloggedinlocal.setLocalStorage(token);
      }
    }
  });
});

// Profile Page
routes.get('/profile' , isLoggedIn , (req, res) => {
  //res.send(req.user + ' ' + isloggedinlocal.setLocalStorage(token));
});

module.exports = routes;
