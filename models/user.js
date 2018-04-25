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
  },
  location: {
    type: {
      type: String,
      default: 'Point'
    },
    coordinates: {
      type: [Number],
      default: [41.3631161, 2.169756]
    }
  }
});

userSchema.index({location: '2dsphere'});

const User = mongoose.model('User', userSchema);

module.exports = User;
