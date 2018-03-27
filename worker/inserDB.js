const Twitter = require('twitter');
const mongoose = require('mongoose');

const nameDB = process.env.DB || 'twitter';
mongoose.connect(`mongodb://localhost/${nameDB}`);

const usermodel = mongoose.model('user', {
    t_id: Number,
    screen_name: String,
    name: String,
});

const tweetmodel = mongoose.model('tweet', {
    created_at: Date,
    t_id: Number,
    text: String,
    user_id: String,
    entities: {},
});

const client = new Twitter({

    consumer_key: "wE1rUBP62LAw0fmz7kCJfkKSS",

    consumer_secret: "fVxZGFvN1ilCCDCdFz0bEiC7UW10h0pu7G3MvLaOFTxgTEbcen",

    access_token_key: "127214118-0KtH9321ZzaCU5i42dABGYJi1XKkNCh5rCpRAHqR",

    access_token_secret: "7PW0sGzG4BHulR94kjrBacsN0v1puy3WegPUXGnog9HLS"

});

client.stream('statuses/filter', { track: 'hola', language: 'es' }, function (stream) {

    stream.on('data', function (tweet) {
        usermodel({ t_id: tweet.user.id, screen_name: tweet.user.screen_name, name: tweet.user.name }).save();
        tweetmodel({ created_at: tweet.created_at, t_id: tweet.id, text: tweet.text, user_id: tweet.user.id }).save();
    });

    stream.on('error', function (error) {

        console.log(error);

    });

});