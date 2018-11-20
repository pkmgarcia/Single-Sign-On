const Twitter = require('twitter');
const functions = require('firebase-functions');
const cors = require('cors')({ origin: true });
const express = require('express');


// Twitter
const twitterConfig = functions.config().twitter;
const twitterClient = new Twitter(twitterConfig);

// Express
const app = express();
app.use(cors);
app.get('/', (req, res) => {
  var params = { screen_name: 'nodejs' };
  twitterClient.get('statuses/user_timeline', params, (error, tweets, response) => {
    if (!error) {
      res.send(tweets);
    }
  });
});

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
// Test func
exports.helloWorld = functions.https.onRequest((request, response) => {
  response.send("Hello from Firebase!");
});

// Test func
exports.twitter = functions.https.onRequest(app);

exports.test = functions.https.onRequest((request, response) => {
  cors((request, response, () => {
    twitterClient.get('statuses/home_timeline', { screen_name: 'nodejs' }, function(error, tweets, res) {
      if (!error) {
        response.status(200).send(tweets);
      }
    });
  }));
});
/*
exports.getTwitterUserAuthentication = functions.https.onRequest((request, response) => {
  request.
  response.send();
});
*/