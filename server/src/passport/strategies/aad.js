const {
  aadCredentials,
  oidcConfig
} = require('./config');

// OIDC Strat
//
const OIDCStrategy = require('passport-azure-ad').OIDCStrategy;
const oidcStrategy = new OIDCStrategy(oidcConfig, function(iss, sub, profile, accessToken, refreshToken, done) {
  if (!profile.oid) {
    return done(new Error("No oid found"), null);
  }
});

// BearerToken Strat
const authenticatedUserTokens = [];
const BearerStrategy = require('passport-azure-ad').BearerStrategy;
const bearerStrategy = new BearerStrategy(aadCredentials, (token, done) => {
  var currentUser = null;
  var userToken = authenticatedUserTokens.find((user) => {
    currentUser = user;
    user.sub === token.sub;
  });
  if (!userToken) {
    authenticatedUserTokens.push(token);
  }
  return done(null, currentUser, token);
});

module.exports = {
  oidcStrategy,
  bearerStrategy
};

