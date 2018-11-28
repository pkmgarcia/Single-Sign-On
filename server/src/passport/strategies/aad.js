const db = require('../../db');

const {
  aadCredentials,
  oidcConfig
} = require('./config');

// OIDC Strategy
const oidcCallback = (req, iss, sub, profile, accessToken, refreshToken, done) => {
  // If user was not authenticated
  if (!profile.oid) {
    return done(new Error("No oid found"), null);
  }

  // Try to find user in database
  db.getEmployeeUsingOID(profile.oid)
    .then(employee => {
      console.log(employee);

      // Add oid to employee if its not there
      if (!employee) {
        db.addOIDToEmployee(profile.oid, employee.empNo);
        employee.oid = profile.oid;
      }

      return done(null, employee);
    });
};

const OIDCStrategy = require('passport-azure-ad').OIDCStrategy;
const oidcStrategy = new OIDCStrategy(oidcConfig, oidcCallback)

module.exports = {
  oidcStrategy
};

/* Old code for authorization
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
*/

