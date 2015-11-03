var express = require('express');
var util = require('./lib/utility');
var partials = require('express-partials');
var bodyParser = require('body-parser');

var db = require('./app/config');
var Users = require('./app/collections/users');
var User = require('./app/models/user');
var Links = require('./app/collections/links');
var Link = require('./app/models/link');
var Click = require('./app/models/click');

//ADDED
var session = require('express-session');

var app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(partials());
// Parse JSON (uniform resource locators)
app.use(bodyParser.json());
// Parse forms (signup/login)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
//CREATE SESSION PARAMS
app.use(session({
  secret: 'fungusamongus',
  resave: false,
  saveUninitialized: false,
  store: false
}))
/*app.use(session({
  secret: 'keyboard cat'
  name'connect.sid'
  resave: if true creates race conditions
  saveUninitialized: false helps with logins
}))*/



//invoke isLogged function
app.get('/', util.isLogged,
function(req, res) {
  res.render('index');
});

//invoke isLogged function
app.get('/create', util.isLogged,
function(req, res) {
  res.render('index');
});

//invoke isLogged function
app.get('/links', util.isLogged,
function(req, res) {
  Links.reset().fetch().then(function(links) {
    res.send(200, links.models);
  });
});

app.post('/links', util.isLogged,
function(req, res) {
  var uri = req.body.url;

  if (!util.isValidUrl(uri)) {
    console.log('Not a valid url: ', uri);
    return res.send(404);
  }

  new Link({ url: uri }).fetch().then(function(found) {
    if (found) {
      res.send(200, found.attributes);
    } else {
      util.getUrlTitle(uri, function(err, title) {
        if (err) {
          console.log('Error reading URL heading: ', err);
          return res.send(404);
        }

        var link = new Link({
          url: uri,
          title: title,
          base_url: req.headers.origin
        });

        link.save().then(function(newLink) {
          Links.add(newLink);
          res.send(200, newLink);
        });
      });
    }
  });
});

/************************************************************/
// Write your authentication routes here
/************************************************************/
app.get('/create', util.isLogged, 
  function(req, res) {
  //if(isLogged){
    //res.redirect('/create')}
});

app.get('/login', util.isLogged, 
  function(req, res){
  //if(isLogged){
  //res.render('/links')}
})

//ALICE
//http://expressjs-book.com/index.html%3Fp=128.html
//setting session variables
//ADD BCRYPT TO RESOURCES
//
app.post('/login'),
  function(req, res){
    var username = req.body.username;
    var password = req.body.password;

    utils.createUser(req,res)
    res.render('/')
  }



/************************************************************/
// Handle the wildcard route last - if all other routes fail
// assume the route is a short code and try and handle it here.
// If the short-code doesn't exist, send the user to '/'
/************************************************************/

app.get('/*', function(req, res) {
  new Link({ code: req.params[0] }).fetch().then(function(link) {
    if (!link) {
      res.redirect('/');
    } else {
      var click = new Click({
        link_id: link.get('id')
      });

      click.save().then(function() {
        db.knex('urls')
          .where('code', '=', link.get('code'))
          .update({
            visits: link.get('visits') + 1,
          }).then(function() {
            return res.redirect(link.get('url'));
          });
      });
    }
  });
});

console.log('Shortly is listening on 4568');
app.listen(4568);
