const twitterStrategy = require('./twitter');
const {
  oidcStrategy,
  bearerStrategy
} = require('./aad');

const {
  signInStrategy
} = require('./auth');

module.exports = {
  twitterStrategy,
  oidcStrategy,
  bearerStrategy,
  signInStrategy
};

