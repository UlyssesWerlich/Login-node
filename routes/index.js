//npm install -S passport-local
//npm install -S bcrypt

var express = require('express');
var router = express.Router();
var passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', {message: null});
});

router.get('/login', function(req, res){
  if(req.query.fail)
    res.render('login', { message: 'Usuário e/ou senha incorretos!' });
  else
    res.render('login', { message: null });
});

router.post('/login',
  passport.authenticate('local', { successRedirect: '/index', failureRedirect: '/login?fail=true' })
);

router.get('/index', authenticationMiddleware (), function(req, res){
  res.render('index', { username: req.user.username });
});

router.get('/page1', authenticationMiddleware (), function(req, res){
  res.render('page1', { username: req.user.username });
});

router.get('/page2', authenticationMiddleware (), function(req, res){
  console.log(req.session);
  console.log(req.user);
  res.render('page2', { username: req.user.username });
});

router.get('/page3', authenticationMiddleware (), function(req, res){
  res.render('page3', { username: req.user.username });
});

router.post('/logoff', function(req, res, next){
  req.logOut();
  res.redirect('/login');
})

function authenticationMiddleware () {  
  return function (req, res, next) {
    if (req.isAuthenticated()) {
      return next()
    }
    res.redirect('/login?fail=true')
  }
}

module.exports = router;
