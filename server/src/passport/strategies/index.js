const twitterStrategy = require('./twitter');
const {
  oidcStrategy
} = require('./aad');
const googlePlusStrategy = require('./googlePlusConfig');

module.exports = {
  twitterStrategy,
  oidcStrategy,
  googlePlusStrategy
};

