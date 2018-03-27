const mongoose = require('mongoose');
const tweetmodel = mongoose.model('tweet', {
    created_at: Date,
    t_id: Number,
    text: String,
    user_id: String,
    entities: {},
  });

  function list() {
    return tweetmodel.find({});
  }
  
  function getTweetId(idtweet){
    return tweetmodel.find({t_id: idtweet})
  }
  
  function getRt(iduser){
    tweetmodel.find({users: parseInt(idUser)})
    .then((result) => {
     console.log(result);
    })
    .catch(next);
  }

  function getTweet(){
      return tweetmodel.find({});
  }

  function getTweetText(nameUser){
      return tweetmodel.find({"text" : {$regex : `.*${nameUser}.*`}});
  }


  module.exports = {
    list,
    getTweetId,
    getRt,
    getTweet,
    getTweetText,
  };