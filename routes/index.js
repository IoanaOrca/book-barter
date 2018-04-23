'use strict';

const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index');
});

/* GET profile page. */
router.get('/edit-profile', (req, res, next) => {
  res.render('edit-profile');
});

module.exports = router;
