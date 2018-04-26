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
  const genre = req.body.genre;
  const condition = req.body.condition;
  const description = req.body.description;
  const owner = req.session.user._id;
  const location = {
    type: 'point',
    coordinates: [req.body.cityLat, req.body.cityLng]
  };

  const book = new Book({
    title,
    author,
    genre,
    condition,
    description,
    owner,
    location
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
