'use strict';

const express = require('express');
const bcrypt = require('bcrypt');

const User = require('../models/user');

const router = express.Router();
const bcryptSalt = 10;

/* GET signup page. */
router.get('/signup', (req, res, next) => {
  const data = {
    title: 'Signup',
    bodyId: 'signup',
    layout: 'auth/layout',
    errorMessage: req.flash('signup-error')
  };
  res.render('auth/signup', data);
});

/* Post signup page. */
router.post('/signup', (req, res, next) => {
  // capitalize every letter
  function toTitleCase (str) {
    return str.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
  }
  const email = req.body.email;
  const username = toTitleCase(req.body.username);
  const password = req.body.password;

  // here check if user already exist
  User.findOne({ username: username })
    .then(result => {
      if (result) {
        req.flash('signup-error', 'User already exists!');
        res.redirect('/auth/signup');
        return;
      }

      const salt = bcrypt.genSaltSync(bcryptSalt);
      const hashPass = bcrypt.hashSync(password, salt);

      const user = new User({ email, username, password: hashPass });

      return user.save()
        .then(() => {
          req.session.user = user;
          res.redirect('/');
        });
    })
    .catch(next);
});

/* GET login page. */
router.get('/login', (req, res, next) => {
  const data = {
    title: 'Login',
    bodyId: 'login',
    layout: 'auth/layout',
    errorMessage: req.flash('login-error') };
  res.render('auth/login', data);
});

/* POST login page. */
router.post('/login', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  // here check if user already exist
  User.findOne({ username: username })
    .then(result => {
      if (!result) {
        req.flash('login-error', 'Username can not be found!');
        res.redirect('/auth/login');
        return;
      }
      if (!bcrypt.compareSync(password, result.password)) {
        req.flash('login-error', 'Incorrect password!');
        res.redirect('/auth/login');
        return;
      }
      req.session.user = result;
      res.redirect('/');
    })
    .catch(next);
});

// remove the user from the session
router.post('/logout', (req, res, next) => {
  delete req.session.user;
  res.redirect('/');
});

module.exports = router;
