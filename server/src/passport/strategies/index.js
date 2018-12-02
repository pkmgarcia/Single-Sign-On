const twitterStrategy = require('./twitter');
const {
  oidcStrategy,
  bearerStrategy
} = require('./aad');
const googlePlusStrategy = require('./googlePlus');

module.exports = {
  twitterStrategy,
  oidcStrategy,
  googlePlusStrategy
};

