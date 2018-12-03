const twitterStrategy = require('./twitter');
const {
  oidcStrategy,
  bearerStrategy
} = require('./aad');
const googlePlusStrategy = require('./googlePlusConfig');

module.exports = {
  twitterStrategy,
  oidcStrategy,
  googlePlusStrategy
};

