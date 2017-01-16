"use strict";

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PostSchema = new Schema({
    createdAt       : { type: Date }
  , updatedAt       : { type: Date }

  , title           : { type: String, required: true }
  , description     : { type: String }
});

PostSchema.pre('save', function(next){
  // SET createdAt AND updatedAt
  var now = new Date();
  this.updatedAt = now;
  if ( !this.createdAt ) {
    this.createdAt = now;
  }
  
  next();
});

module.exports = mongoose.model('Post', PostSchema);