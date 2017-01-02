var express = require('express');
var router = express.Router();
var User = require('../models/user');

// USERS
router.get('/', function(req, res, next) {
  res.render('users-index');  
});

module.exports = router;
