/*jslint node: true , esnext: true , globals : true*/
'use strict';
//
//  Check if is logged in
//
const jwt = require('jsonwebtoken');
const fs = require('fs');

exports.isLoggedIn = (req , res, next) => {
  const token = req.body.token || req.query.token || req.headers['x-access-token'];
  const secret = fs.readFileSync(_config.secretFile, 'utf-8');
  if(token){
    jwt.verify(token , secret , (err , decoded) => {
      if(err){
        return res.json({ success: false, message: 'Failed to authenticate token.' });
      } else {
        req.user = decoded;
        next();
      }
    });
  } else {
    return res.status(403).send({
      success : false,
      message : 'no token provided'
    });
  }
};


// LocalStorage Manage
class isLoggedInLocal {
  constructor() {
    this.name = 'handle LocalStorage Authentication';
  }
  getLocalStorage(){
    return Window.localStorage.getItem('token');
  }
  setLocalStorage(token){
    return Window.localStorage.setItem('token' , token);
  }
}

const isloggedinlocal = new isLoggedInLocal();

exports.isloggedinlocal = isloggedinlocal;
