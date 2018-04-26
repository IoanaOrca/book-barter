'use strict';

const express = require('express');
const router = express.Router();
const Book = require('../models/book');

/* GET map page. */
router.get('/book/:bookId', (req, res, next) => {
  Book.findOne({ _id: req.params.bookId })
    .populate('owner')
    .then(result => {
      const data = { book: result };

      res.json(data);
    })
    .catch(next);
});

/* POST book page. */
router.post('/book', (req, res, next) => {
  const title = req.body.title;
  const query = {
    $and: [
      { title: title },
      { applicant: null }
    ]
  };
  if (req.session.user) {
    query.$and.push({ owner: { $ne: req.session.user._id } });
  }
  Book.find(query)
    .populate('owner')
    .then(result => {
      const data = { book: result };
      res.json(data);
    })
    .catch(next);
});

module.exports = router;
