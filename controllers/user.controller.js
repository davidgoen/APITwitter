const userModel = require('../models/user.model');
const tweetModel = require('../models/tweet.model');

function getName(nameUser) {
  if (nameUser === undefined) {
    return userModel.getAll();
  } else {
    console.log(nameUser)
    return userModel.getName(nameUser);
  }
}

function getUserId(iduser) {
  return userModel.getUserId(iduser);
}

function gettweet(id){
  return tweetModel.getTweetIdUser(id);
}

module.exports = {
  getName,
  getUserId,
  gettweet,
};
