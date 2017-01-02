"use strict";

var mongoose = require('mongoose'),
    bcrypt = require("bcryptjs"),
    Schema = mongoose.Schema;

var UserSchema = new Schema({
    email           : { type: String, unique: true, required: true }
  , password        : { type: String, required: true }
}, {
  toObject: {
    virtuals: true
  }, toJSON: {
    virtuals: true
  }
});

UserSchema.pre('save', function(next){
  // SET createdAt AND updatedAt
  var now = new Date();
  this.updatedAt = now;
  if ( !this.createdAt ) {
    this.createdAt = now;
  }

  // ENCRYPT PASSWORD
  var user = this;
  if (!user.isModified('password')) {
    return next();
  }
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(user.password, salt, function(err, hash) {
      user.password = hash;
      next();
    });
  });
});


UserSchema.methods.comparePassword = function(password, done) {
  bcrypt.compare(password, this.password, function(err, isMatch) {
    done(err, isMatch);
  });
};

module.exports = mongoose.model('User', UserSchema);