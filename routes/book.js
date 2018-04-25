'use strict';

const express = require('express');
const router = express.Router();
const Book = require('../models/book');
const User = require('../models/user');

/* GET addbook page. */
router.get('/addbook', (req, res, next) => {
  res.render('addbook');
});

/* Post book page. */
router.post('/addbook', (req, res, next) => {
  const title = req.body.title;
  const author = req.body.author;
  const owner = req.session.user._id;

  const book = new Book({
    title,
    author,
    owner
  });

  book
    .save()
    .then(() => {
      res.redirect('/edit-profile');
    })
    .catch(next);
});

/* GET detail page. */
router.get('/:bookId', (req, res, next) => {
  // check if the user is logged in
  Book.findOne({ _id: req.params.bookId }).populate('owner')
    .then(result => {
      const data = {
        book: result
      };
      res.render('book-details', data);
    }).catch(next);
});

/* POST reserve book. */
router.post('/:bookId/reserve', (req, res, next) => {
  Book.update({_id: req.params.bookId}, { applicant: req.session.user._id })
    .then(result => {
      res.redirect('/edit-profile');
    })
    .catch(next);
});

module.exports = router;
