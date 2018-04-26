'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  genre: {
    type: String,
    required: true
  },
  condition: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  applicant: {
    type: Schema.Types.ObjectId,
    default: null
  },
  location: {
    type: {
      type: String
    },
    coordinates: [Number]
  }
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
