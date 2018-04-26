'use strict';

const express = require('express');
const mongoose = require('mongoose');

const Book = require('../models/book');

const router = express.Router();

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

  book.save()
    .then(() => {
      res.redirect('/edit-profile');
    })
    .catch(next);
});

/* GET detail page. */
router.get('/:bookId', (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.bookId)) {
    next();
    return;
  }
  // check if the user is logged in
  Book.findOne({ _id: req.params.bookId })
    .populate('owner')
    .then(result => {
      if (!result) {
        next();
        return;
      }

      const data = { book: result };
      res.render('book-details', data);
    })
    .catch(next);
});

/* POST reserve book. */
router.post('/:bookId/reserve', (req, res, next) => {
  const criteria = {_id: req.params.bookId};
  const projection = { applicant: req.session.user._id };
  Book.update(criteria, projection)
    .then(result => {
      res.redirect('/edit-profile');
    })
    .catch(next);
});

module.exports = router;
