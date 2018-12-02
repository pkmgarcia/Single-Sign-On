const { googlePlusConfig } = require('./config');

const Strategy = require("passport-google-oauth").OAuth2Strategy;
const googlePlusStrategy = new Strategy({
  ...googlePlusConfig,
  proxy: false
  },
  (accessToken, refreshToken, profile, cb) => {
    return cb(null, profile);
  }
);

exports = googlePlusStrategy;

