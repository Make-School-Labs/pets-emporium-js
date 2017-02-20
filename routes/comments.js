var express = require('express');
var router = express.Router();
var Comment = require('../models/comment');

// CREATE POST
router.comment('/', function(req, res, next) {
  Post.findById(req.params.postId).exec(function (err, post) {
    var comment = new Comment(req.body);

    comment.post = post;

    comment.save(function (err) {
      if (err) { return res.status(400).send(err) }

      post.comments << comment;
      post.save();
      
      res.send(comment);
    });
  })
});

module.exports = router;
