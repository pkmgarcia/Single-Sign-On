const twitterStrategy = require('./twitter');
const {
  oidcStrategy,
  bearerStrategy
} = require('./aad');

module.exports = {
  twitterStrategy,
  oidcStrategy,
  bearerStrategy
};

