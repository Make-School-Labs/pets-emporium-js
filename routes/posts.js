var express = require('express');
var router = express.Router();
var Post = require('../models/post');

// POSTS
router.get('/', function(req, res, next) {
  Post.find().sort('-createdAt').exec(function (err, posts) {

    res.render('posts-index', { posts: posts });
  });
});

// POSTS SHOW
router.get('/:id', function(req, res, next) {
  Post.findById(req.params.id).populate('comments').exec(function (err, post) {

    res.render('posts-show', { post: post });
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
