const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const cache = require('./cache');

const nameDB = process.env.DB || 'twitter';
mongoose.connect(`mongodb://localhost/${nameDB}`);
const packageRouter = require('./routes/package');

const app = express();

app.get('*', (req, res, next) => {
  console.log('req.url', req.url);
  /*console.log('cache app', cache);
  if (cache[req.url]) {
    console.log('return cache');
    return res.json(cache[req.url]);
  }*/
  next();
});
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/tweets', packageRouter);

/*
app.get('*', (req, res, next) => {
  console.log('cacheo');
  const response = req._response;
  console.log("Aqui");
  if (response) {
    cache[req.url] = response;
    return res.json(response);
  }
  next();
});*/
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  console.error(err);
  res.status(err.status || 500);
  res.json({msg: err.message || 'error'});
});

module.exports = app;
