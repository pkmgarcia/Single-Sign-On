const twitterStrategy = require('./twitter');
const { oidcStrategy } = require('./aad');

module.exports = {
  twitterStrategy,
  oidcStrategy
};

