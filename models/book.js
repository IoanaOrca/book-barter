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
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  applicant: {
    type: Schema.Types.ObjectId,
    default: null
  }
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
