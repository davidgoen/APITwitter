const tweetModel = require('../models/tweet.model');

function list() {
  return tweetModel.list();
}

function getTweetid(id){
  return tweetModel.getTweetId(id);
}

function gettweet(nameUser){
  if(nameUser===undefined){
    return tweetModel.getTweet();
  }else{
    return tweetModel.getTweetText(nameUser);
  }
}

module.exports = {
  list,
  gettweet,
  getTweetid
};