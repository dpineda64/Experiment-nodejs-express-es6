/*jslint node: true , esnext: true*/
'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const Schema = mongoose.Schema;

const User = new Schema({
  email: String,
  password: String
});

User.methods.generateHash = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};
User.methods.validPass = (password) => {
  return bcrypt.compareSync(password , this.user.password);
};

/*class USER {
  constructor() {
    const User = new Schema({
      email: String,
      password: String
    });
  }
  generateHash(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
  }
  validPass(password){
    return bcrypt.compareSync(password, this.user.password);
  }
}

const user = new USER();*/

module.exports = mongoose.model('User', User);
