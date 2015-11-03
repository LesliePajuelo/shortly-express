var db = require('../config');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');

var User = db.Model.extend({
  
  tableName:'users'
  //http://bookshelfjs.org/
});

module.exports = User;