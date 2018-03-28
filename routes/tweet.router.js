const express = require('express');
const router = express.Router();
const cache = require('../cache');
const tweetCtrl = require('../controllers/tweet.controler');
const rutarellena = require('../functions/functionRellenaRuta');
const err = new Error('No hay resultados');

function guardaCache(urlMod, result) {
  console.log('Guardo en cache: ' + urlMod);
  cache[urlMod] = result;
}

router.get('/', (req, res, next) => {
  var qdata = req.query.text
  tweetCtrl.gettweet(qdata)
    .then((result) => {
      if (result.length==0) {
        err.status = 411;
        throw err;
        next(err);
      } else {
        res.json(result);
          const miurl = rutarellena.getGlobal('/tweets', req.url)
          guardaCache(miurl, result);
      }
    })
    .catch(next);
});

router.get('/:id', (req, res, next) => {
  tweetCtrl.getTweetid(req.params.id)
    .then((result) => {
      if (!result) {
        err.status = 411;
        throw err;
        next(err);
      } else {
        res.json(result);
        const miurl = rutarellena.getGlobal('/tweets', req.url)
        guardaCache(miurl, result);
      }
    })
    .catch(next);
});

module.exports = router;