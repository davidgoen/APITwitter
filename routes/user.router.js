const express = require('express');
const router = express.Router();
const cache = require('../cache');
const miurl = require('url');

const userCtrl = require('../controllers/user.controller');

router.get('/', (req, res, next) => {
  var qdata = req.query.name
  userCtrl.getName(qdata)
    .then((result) => {
      res.json(result);
    })
    .catch(next);
});

router.get('/:id', (req, res, next) => {
  userCtrl.getUserId(req.params.id)
    .then((result) => {
      res.json(result);
    })
    .catch(next);
});


router.get('/:id/tweets/', (req, res, next) => {
  userCtrl.gettweet(req.params.id)
    .then((result) => {
      res.json(result);
    })
    .catch(next);
});

/* router.get('*', (req, res, next) => {
  ///Cambiar lo de https://www.w3schools.com/nodejs/nodejs_url.asp
  const urltotal = getGlobal('/tweets', req.url);
  if (req.url != '/') {
    var url = req.url.split(":");
    switch (url[0]) {
      case '/user':
        userCtrl.getName(url[1])
          .then((result) => {
            const idName = JSON.parse(JSON.stringify(result[0]))["t_id"];
            tweetCtrl.gettweetsuser(idName)
              .then((result) => {
                res.json(result);
                cache[urltotal] = result;
              })
          })
          .catch(next);
        break;
      case '/text':
      tweetCtrl.searchtweet(url[1])
          .then((result) => {
            res.json(result);
            cache[urltotal] = result;
          })
          .catch(next);
        break;
      case '/rt':
      userCtrl.getName(url[1])
          .then((result) => {
            const idName = JSON.parse(JSON.stringify(result[0]))["t_id"];
            console.log(idName);
            tweetCtrl.getRt(idName)
          })
          .catch(next);
        break;
      default:
      tweetCtrl.list()
          .then((result) => {
            res.json(result);
            cache[urltotal] = result;
          })
          .catch(next);
    }
  }
}); */

router.post('/', (req, res, next) => {
  userCtrl.create(req.body)
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
