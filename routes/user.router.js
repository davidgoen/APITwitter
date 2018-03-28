const express = require('express');
const router = express.Router();
const cache = require('../cache');
const userCtrl = require('../controllers/user.controller');

const rutarellena = require('../functions/functionRellenaRuta');
const err = new Error('No hay resultados');

function guardaCache(urlMod, result) {
  console.log('Guardo en cache' + urlMod);
  cache[urlMod] = result;
}

router.get('/', (req, res, next) => {
  var qdata = req.query.name
  userCtrl.getName(qdata)
    .then((result) => {
      if (result.length == 0) {
        err.status = 411;
        throw err;
        next(err);
      } else {
        res.json(result);
        const miurl = rutarellena.getGlobal('/users', req.url)
        guardaCache(miurl, result);
      }
    })
    .catch(next);
});

router.get('/:id', (req, res, next) => {
  userCtrl.getUserId(req.params.id)
    .then((result) => {
      if (!result) {
        err.status = 411;
        throw err;
        next(err);
      } else {
        res.json(result);
        const miurl = rutarellena.getGlobal('/users', req.url)
        guardaCache(miurl, result);
      }
    })
    .catch(next);
});


router.get('/:id/tweets/', (req, res, next) => {
  userCtrl.gettweet(req.params.id)
    .then((result) => {
      if (!result) {
        err.status = 411;
        throw err;
        next(err);
      } else {
        res.json(result);
        const miurl = rutarellena.getGlobal('/users', req.url)
        guardaCache(miurl, result);
      }
    })
    .catch(next);
});

module.exports = router;
