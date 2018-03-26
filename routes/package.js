const express = require('express');
const router = express.Router();
const cache = require('../cache');

const packageCtrl = require('../controllers/package.controller');

function getGlobal(route, url) {
  if (url === '/') {
    return route;
  }
  return `${route}${url}`;
}

router.get('*', (req, res, next) => {
  console.log(req.url);
  if (req.url != '/') {
    var url = req.url.split(":")
    console.log(url[0]);
    if(url[0]==='/user'){
      packageCtrl.getName(url[1])
      .then((result) => {
        /*const url = getGlobal('/tweets', req.url);
        // console.log('cache route', cache);
        cache[url] = result;*/
        const idName = JSON.parse(JSON.stringify(result[0]))["id"];
        console.log(idName);
        packageCtrl.gettweetsuser(idName)
          .then((result) => {
            res.json(result);
          })
      })
      .catch(next);
    }else{
      packageCtrl.searchtweet(url[1])
      .then((result) => {
        res.json(result);
      })
      .catch(next);
    }
  } else {
    packageCtrl.list()
      .then((result) => {
        /*const url = getGlobal('/tweets', req.url);
        // console.log('cache route', cache);
        cache[url] = result;*/
        res.json(result);
      })
      .catch(next);
  }
});

router.post('/', (req, res, next) => {
  packageCtrl.create(req.body)
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
