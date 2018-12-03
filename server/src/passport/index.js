const passport = require('passport');
const strategies = require('./strategies');
const db = require('../db');

// Serialize/Deserialize using 
passport.serializeUser(function(employee, done) {
  console.log(`[Serializing] Got ${employee.empNo}`);
  done(null, employee.oid);
});
passport.deserializeUser(function(oid, done) {
  console.log(`[Deserializing] Got ${oid}`);
  db.getEmployeeUsingOID(oid)
    .then(employee => {
      // No need to check if employee was fetched since employee == false if it didn't work
      console.log(`[Deserializing] Found ${employee.empNo}`);
      return done(null, employee);
    }
  );
});

// Azure AD
passport.use(strategies.oidcStrategy);
passport.use(strategies.bearerStrategy);
// Twitter Passport
passport.use(strategies.twitterStrategy);
// Google+ passport
passport.use(strategies.googlePlusStrategy);

module.exports = passport;

