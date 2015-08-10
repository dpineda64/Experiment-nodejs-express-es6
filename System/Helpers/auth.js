/*jslint node: true , esnext: true*/
'use strict';
//
//  Authentication Functions
//

const bcrypt = require('bcrypt-nodejs');

class Auth {
  constructor() {
    this.name = 'Authentication helper';
  }
  generateHash(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
  }
  validPass(password , user_pass){
    return bcrypt.compareSync(password, user_pass);
  }
}

class generateHash extends Auth {
  constructor() {
    super();
  }
}

const auth = new Auth();

module.exports = auth;
