var request = require('request');

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
  //model.user.session = ( req.sessions.regenerate(function(){}



//createUser(req, res, user)
  //check username exists
    //res.redirect('/login')
  
  // models.__create new user = user;
  // createSession()
  // res.redirect('/')
  //}) 


//isLogged
 //if(req.session.user){
 //next()
 //} else{
 //res.redirect('/login')} 
exports.isLogged = function(){
  return true;
};

//10  req.params
//An object containing properties mapped to the named route “parameters”. For example, if you have the route /user/:name, then the "name" property is available as req.params.name. This object defaults to {}.

// req.cookies
// When using cookie-parser middleware, this property is an object that contains cookies sent by the request.
