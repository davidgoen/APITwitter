const express = require('express');
const router = express.Router();
const cache = require('../cache');
const miurl = require('url');

const tweetCtrl = require('../controllers/tweet.controler');

router.get('/', (req, res, next) => {
    var qdata = req.query.text
    tweetCtrl.gettweet(qdata)
      .then((result) => {
        res.json(result);
      })
      .catch(next);
  });

  router.get('/:id', (req, res, next) => {
    tweetCtrl.getTweetid(req.params.id)
      .then((result) => {
        res.json(result);
      })
      .catch(next);
  });

  module.exports = router;