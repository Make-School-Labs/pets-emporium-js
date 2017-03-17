var express = require('express');
var router = express.Router();
var Comment = require('../models/comment');
var Pet = require('../models/pet');

// CREATE COMMENT
router.post('/', function(req, res, next) {
  Pet.findById(req.params.petId).exec(function (err, pet) {
    var comment = new Comment(req.body);

    comment.pet = pet;

    comment.save(function (err) {
      if (err) { return res.status(400).send(err) }

      pet.comments << comment;
      pet.save();
      
      res.send(comment);
    });
  })
});

module.exports = router;
