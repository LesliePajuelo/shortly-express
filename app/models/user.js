var db = require('../config');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');

var User = db.Model.extend({
  
  tableName:'users', 
  initialize: function(){
    this.on('create', this.createPassword);
  },
  
  //http://bookshelfjs.org/
  createPassword: function() {
    bcrypt.hash(model.get('password'), null, null, function(err, hash) {
      if(err){
      console.log('model create password');
      } else {
        model.set('password', hash);
      }
      
    });
  }, 

  checkPassword: function(req, res){
    bcrypt.compare(req.body.password, model.get('password'),function(err, res) {
      if(err){
        res.redirect('/signup');
      } else {
        res.redirect('/index');
      }
    });
  }
});//model.extend

module.exports = User;





