const mongoose = require('mongoose');

const usermodel = mongoose.model('user', {
  name: String,
  id: String,
});

const tweetmodel = mongoose.model('tweet', {
  text: String,
  users:[],
  id: String,
});

function list() {
  return tweetmodel.find({});
}

function getName(nameUser){
  return usermodel.find({name: nameUser});
}

function gettweetsuser(idUser){
  return tweetmodel.find({users: parseInt(idUser)})
}

function searchtweet(textfind){
  return tweetmodel.find({"text" : {$regex : `.*${textfind}.*`}});
}

function create(pkg) {
  const packageModel = new Package(pkg);
  return packageModel.save()
    .catch((error) => {
      if (error.code === 11000) {
        const err = new Error('Duplicate');
        err.status = 411;
        throw err;
      }
      throw error;
    });
}
module.exports = {
  list,
  getName,
  create,
  gettweetsuser,
  searchtweet,
};
