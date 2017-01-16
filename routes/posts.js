var express = require('express');
var router = express.Router();
var Post = require('../models/post');

// POSTS
router.get('/', function(req, res, next) {
  Post.find().sort('-createdAt').exec(function (err, posts) {

    res.render('posts-index', { posts: posts });
  });
});

// CREATE POST
router.post('/', function(req, res, next) {
  var post = new Post(req.body);

  post.save(function (err) {
    if (err) { return res.status(400).send(err) }
    
    res.send(post);
  });
});

module.exports = router;
