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
  Book.find({owner: req.session.user._id})
    .then(result => {
      const data = {
        books: result
      };
      res.render('edit-profile', data);
    });
});

/* POST delete book. */
router.post('/edit-profile/delete', (req, res, next) => {
  Book.remove({ _id: req.params._id })
    .then(() => {
      res.redirect('/edit-profile');
    });
});

module.exports = router;
