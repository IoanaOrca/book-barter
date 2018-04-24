'use strict';

const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  throw new Error('debbug mesage');
  res.render('index');
});

/* GET profile page. */
router.get('/edit-profile', (req, res, next) => {
  res.render('edit-profile');
});

module.exports = router;
