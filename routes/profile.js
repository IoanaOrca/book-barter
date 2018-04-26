'use strict';

const express = require('express');
const router = express.Router();
const Book = require('../models/book');

/* GET profile page. */
router.get('/', (req, res, next) => {
  const data = {};
  Book.find({ owner: req.session.user._id }).populate('owner')
    .then(resultmybook => {
      data.mybooks = resultmybook;
      return Book.find({ applicant: req.session.user._id }).populate('owner');
    })
    .then(resultbooksapplied => {
      data.reservedbooks = resultbooksapplied;
      res.render('edit-profile', data);
    })
    .catch(next);
});

/* POST delete book. */
router.post('/delete/:bookId', (req, res, next) => {
  Book.remove({ _id: req.params.bookId })
    .then(() => {
      res.redirect('/edit-profile');
    })
    .catch(next);
});
/* POST delete book. */
router.post('/unreserve/:bookId', (req, res, next) => {
  Book.update({ _id: req.params.bookId }, { applicant: null })
    .then(() => {
      res.redirect('/edit-profile');
    })
    .catch(next);
});

module.exports = router;
