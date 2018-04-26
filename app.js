'use strict';

// packages
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const flash = require('connect-flash');
require('dotenv').config();

const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const bookRouter = require('./routes/book');
const profileRouter = require('./routes/profile');
const apiRouter = require('./routes/api');

const app = express();

// database connection
mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/book-barter', {
  keepAlive: true,
  reconnectTries: Number.MAX_VALUE
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// session
app.use(
  session({
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      ttl: 24 * 60 * 60 // 1 day
    }),
    secret: 'some-string',
    resave: true,
    saveUninitialized: true,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000
    }
  })
);

// middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(flash());

app.use((req, res, next) => {
  app.locals.user = req.session.user;
  next();
});

// -- routes

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/book', bookRouter);
app.use('/edit-profile', profileRouter);
app.use('/api', apiRouter);

// -- 404 and error handler

// NOTE: requires a views/not-found.ejs template
app.use((req, res, next) => {
  res.status(404);
  const data = {
    title: 'Unexpected Error',
    bodyId: 'error',
    layout: 'errors/layout'
  };
  res.render('errors/not-found', data);
});

// NOTE: requires a views/error.ejs template
app.use((err, req, res, next) => {
  // always log the error
  console.error('ERROR', req.method, req.path, err);

  // only render if the error ocurred before sending the response
  if (!res.headersSent) {
    res.status(500);
    const data = {
      title: 'Not Found',
      bodyId: 'not-found',
      layout: 'errors/layout'
    };
    res.render('errors/error', data);
  }
});

module.exports = app;
