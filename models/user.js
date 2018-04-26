'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  reserved: {
    type: Object,
    default: []
  }
});

userSchema.index({location: '2dsphere'});

const User = mongoose.model('User', userSchema);

module.exports = User;
