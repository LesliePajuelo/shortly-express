var request = require('request');

var Users = require('./../app/collections/users');
var User = require('./../app/models/user');
var Promise = require('bluebird');


exports.getUrlTitle = function(url, cb) {
  request(url, function(err, res, html) {
    if (err) {
      console.log('Error reading url heading: ', err);
      return cb(err);
    } else {
      var tag = /<title>(.*)<\/title>/;
      var match = html.match(tag);
      var title = match ? match[1] : url;
      return cb(err, title);
    }
  });
};

var rValidUrl = /^(?!mailto:)(?:(?:https?|ftp):\/\/)?(?:\S+(?::\S*)?@)?(?:(?:(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[0-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))|localhost)(?::\d{2,5})?(?:\/[^\s]*)?$/i;

exports.isValidUrl = function(url) {
  return url.match(rValidUrl);
};

/************************************************************/
// Add additional utility functions below
/************************************************************/

//createSession
exports.createSession = function(req, callback){
  req.session.regenerate(function(err){
    if(err){
      console.log(err);
    } else{
      //session[req.sessionID] = req.body.username; //sessionID is a read only value
      callback();
    }
  });
};

exports.createUser = function(req, callback) {
  new User({username: req.body.username})
    .fetch()
    .then(function(user) {
      if (!user) {
        new User({username: req.body.username,
                  password: req.body.password
        }).save()
        .then(function(err) {
          if (err) {
            console.log('Create user ' + err);
          } else {
            callback();
          }
        })
      } else {
        redirect('/login');
      }
    }) 
};
//createUser(req)
//create new user.fetch().then(
 //if new user
  //if(!user){
  //new User(req.body)
  // .save()
  // .then(function(){
  // createSession(req, function(){
  // redirect('/')})})
//redirect('/login') 
  //}) 


//isLogged
exports.isLogged = function(){
  if(req.sessionID){
    next();
  } else{
    res.redirect('/login');
  } 
};

//10  req.params
//An object containing properties mapped to the named route “parameters”. For example, if you have the route /user/:name, then the "name" property is available as req.params.name. This object defaults to {}.

// req.cookies
// When using cookie-parser middleware, this property is an object that contains cookies sent by the request.
