const mongoose = require('mongoose');

const usermodel = mongoose.model('user', {
  t_id: Number,
  screen_name: String,
  name: String,
});

//Fucion para forzar el nombre en singular
/*const tweetmodel = mongoose.model('tweet', {
  text: String,
  users:[],
  id: String,
}, {collection: <nombreuser>});*/

function getAll(){
    return usermodel.find({});
}

function getName(nameUser){
  return usermodel.find({"name" : {$regex : `.*${nameUser}.*`}});
}


function getUserId(id){
  return usermodel.find({"t_id" : id});
}

module.exports = {
  getName,
  getAll,
  getUserId,
};
