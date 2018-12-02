const twitterStrategy = require('./twitter');
const {
  oidcStrategy
} = require('./aad');
const googlePlusStrategy = require('./googlePlus');

module.exports = {
  twitterStrategy,
  oidcStrategy,
  googlePlusStrategy
};

