const packageModel = require('../models/package.model');

function list() {
  return packageModel.list();
}

function getName(name) {
  return packageModel.getName(name);
}

function gettweetsuser(id){
  return packageModel.gettweetsuser(id);
}

function searchtweet(text){
  return packageModel.searchtweet(text);
}


function create(pkg) {
  return packageModel.create(pkg);
}

module.exports = {
  list,
  getName,
  create,
  gettweetsuser,
  searchtweet,
};
