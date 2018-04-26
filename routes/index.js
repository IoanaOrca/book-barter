'use strict';

const express = require('express');
const router = express.Router();
const Book = require('../models/book');

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', {layout: false});
});

/* GET profile page. */
router.get('/edit-profile', (req, res, next) => {
  const data = {};
  Book.find({ owner: req.session.user._id })
    .then(resultmybook => {
      data.mybooks = resultmybook;
      return Book.find({ applicant: req.session.user._id }).populate('owner');
    })
    .then(resultbooksapplied => {
      data.reservedbooks = resultbooksapplied;
      res.render('edit-profile', data);
    });
});

/* POST delete book. */
router.post('/edit-profile/delete/:bookId', (req, res, next) => {
  Book.remove({ _id: req.params.bookId })
    .then(() => {
      res.redirect('/edit-profile');
    });
});

module.exports = router;
