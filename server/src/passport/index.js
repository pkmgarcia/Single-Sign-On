const passport = require('passport');
const strategies = require('./strategies');
const db = require('../db');

passport.serializeUser(function(user, cb) {
  cb(null, user.empNo);
});
passport.deserializeUser(function(empNo, cb) {
  const statement = 'SELECT * FROM employees WHERE emp_no=' + empNo;
  db.query(statement,
    function(err, tuples) {
      cb(err, tuples[0]);
    }
  );
  cb(null, false);
});

// MySql Auth
passport.use(strategies.signInStrategy);
// Azure AD OIDC Strategy
passport.use(strategies.oidcStrategy);
// Azure AD Bearer Token Strategy
passport.use(strategies.bearerStrategy);
// Twitter Passport
passport.use(strategies.twitterStrategy);

module.exports = passport;

