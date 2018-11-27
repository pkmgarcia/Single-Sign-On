const passport = require('passport');
const strategies = require('./strategies');
const db = require('../db');

// Serialize/Deserialize using 
passport.serializeUser(function(employee, done) {
  done(null, employee.oid);
});
passport.deserializeUser(function(oid, done) {
  const employee = db.getEmployeeFromOID(oid);

  // No need to check if employee was fetched since employee == false if it didn't work
  return done(null, employee);
});

// Azure AD OIDC Strategy
passport.use(strategies.oidcStrategy);
// Twitter Passport
passport.use(strategies.twitterStrategy);

module.exports = passport;

