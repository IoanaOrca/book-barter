'use strict';

const express = require('express');
const mongoose = require('mongoose');

const Book = require('../models/book');

const router = express.Router();

/* GET map page. */
router.get('/book/:bookId', (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.bookId)) {
    res.status(404).json({error: 'not-found'});
    return;
  }
  Book.findOne({ _id: req.params.bookId })
    .populate('owner')
    .then(result => {
      if (!result) {
        res.status(404).json({error: 'not-found'});
        return;
      }
      const data = {
        book: result
      };
      res.json(data);
    })
    .catch((err) => {
      console.error('ERROR', req.method, req.path, err);
      res.status(500).json({error: 'unexpected'});
    });
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
      const data = {
        book: result
      };
      res.json(data);
    })
    .catch((err) => {
      console.error('ERROR', req.method, req.path, err);
      res.status(500).json({error: 'unexpected'});
    });
});

module.exports = router;
