'use strict';

const express = require('express');
const router = express.Router();
const Book = require('../models/book');

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
      res.redirect('/book/:bookId');
    })
    .catch(next);
});

/* GET detail page. */
router.get('/:bookId', (req, res, next) => {
  Book.findOne({ _id: req.params.bookId }).populate('owner')
    .then(result => {
      const data = {
        book: result
      };

      res.render('book-details', data);
    });
});

/* GET map page. */
// router.get('/json', (req, res, next) => {
//   Book.find({})
//     .then(results => {
//       res.json(results);
//     })
//     .catch(next);
// });

module.exports = router;
