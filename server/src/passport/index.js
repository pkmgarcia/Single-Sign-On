const passport = require('passport');
const strategies = require('./strategies');

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
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

