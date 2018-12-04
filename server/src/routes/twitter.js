const router = require('express').Router();
const cors = require('cors');
const passport = require('../passport');
const config = require('../config');

// Middleware
router.use(cors());

// Set up twitter
const Twitter = require('twitter');
const twitterClient = Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

// Oauth
const failureURL = config.clientPort === ''
  ? 'http://' + config.clientHost + '/oauth/twitter/failure'
  : 'http://' + config.clientHost + ':' + config.clientPort + '/oauth/twitter/failure';
router.use('/api', passport.authenticate('twitter'));
router.get('/oauth',
  function (req, res, next) {
    req.session.lastLocation = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
    next();
  }
);
router.get('/oauth', passport.authenticate('twitter'));
router.use('/oauth/callback',
  passport.authenticate('twitter', { failureRedirect: failureURL }),
  function(req, res) {
   res.redirect(req.session.lastLocation);
  });

// Gets the ten most recent tweets that use the hashtag 'payroll'
router.get('/latest-tweets', function (req, res) {
  const params = {
    count: 20
  };
  twitterClient.get('/statuses/user_timeline', params, function(error, tweets, response) {
    res.status(200).send(tweets);
  });
});

router.post('/tweet', function (req, res) {
  const params = {
    status: req.body.status
  };
  twitterClient.post('/statuses/update', params, function(error, tweet, response) {
    if (error) res.send(error);
    if (tweet) console.log(tweet);
    if (response) res.send(response);
  });
});
module.exports = router;

