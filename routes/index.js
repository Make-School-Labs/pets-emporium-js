var express = require('express');
var router = express.Router();

var User = require('../models/user');

var jwt = require('jsonwebtoken');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('landing', {title: "blah"});
});

// LOGIN FORM
router.get('/login', function(req, res, next) {
  res.render('users-login');
});

// LOGIN POST
router.post('/login', function(req, res, next) {
  // jwt.decode(req.token);
  User.find(req.email, function(err, user) {
    user.comparePassword(req.body.password, function (err, isMatch) {
      if (!isMatch) {
        return res.status(401).send({ message: 'Wrong email or password' });
      }
      var token = jwt.sign({ _id: user._id }, 'shhhhhhared-secret');
      res.send({ token: token });
    });

    res.send(token);
  })
});

// SIGN UP FORM
router.get('/sign-up', function(req, res, next) {
  res.render('users-sign-up');
});

// SIGN UP POST
router.post('/sign-up', function(req, res, next) {
  // Create User and JWT
  console.log(req.body)
  var user = new User(req.body);
  
  user.save(function(err) {
    if (err) { return res.status(400).send(err) }

    var token = jwt.sign({ _id: user._id }, 'shhhhhhared-secret');

    res.send(token);
  })
});


module.exports = router;
