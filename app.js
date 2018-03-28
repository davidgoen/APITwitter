const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const cache = require('./cache');

/*
URL  (relaciones + filtros)
--/tweets (listado de tweets)
--/tweets/:id
--/tweets/?text=asdf cache
/tweet/:id/:users/ (?text=’asdf’) 

--/users/
--/users/:id
--/users/:id/tweets/ → los tweets de un usuario FALTA
*/


const nameDB = process.env.DB || 'twitter';
mongoose.connect(`mongodb://localhost/${nameDB}`);
const tweetRouter = require('./routes/tweet.router');
const userRouter = require('./routes/user.router');

const app = express();

app.get('*', (req, res, next) => {
  console.log('req.url', req.url);
  if (cache[req.url]) {
    console.log('return cache');
    return res.json(cache[req.url]);
  }
  next();
});
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/tweets', tweetRouter);
app.use('/users', userRouter);

// catch 404 and forward to error handler

/*app.use(function(req, res, next) {
  const err = new Error('Not found');
  err.status = 404;
  next(err);
});*/

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  console.error(err);
  res.status(err.status || 500);
  res.json({ msg: err.message || 'error' });
});

module.exports = app;
