const { twitterConfig } = require('./config');

const Strategy = require('passport-twitter').Strategy;
const twitterStrategy = new Strategy({
  ...twitterConfig,
  proxy: false
  },
  function (token, tokenSecret, profile, cb) {
    return cb(null, profile);
    /*
    User.findOrCreate({ twitterId: profile.id }, function (err, user) {
      return cb(err, user);
    });
    */
  }
);

module.exports = twitterStrategy;

