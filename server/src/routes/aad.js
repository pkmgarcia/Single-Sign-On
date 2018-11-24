const router = require('express').Router();
const passport = require('../passport');
const config = require('../config');

const failureRedirect = 'https://localhost:3000/';
const redirect = 'https://localhost:3000/';
const destroySessionUrl = 'https://login.microsoftonline.com/common/oauth2/logout?post_logout_redirect_uri=http://locahost:3000';

router.get('/login',
  function(req, res, next) {
    passport.authenticate('azuread-openidconnect', {
      response: res,
      failureRedirect
    })(req, res, next);
  },
  function(req, res) {
    res.redirect(redirect);
  }
);

router.get('/auth/openid/return',
  function(req, res, next) {
    passport.authenticate('azuread-openidconnect', {
        response: res,
        failureRedirect
    })(req, res, next);
  },
  function(req, res, next) {
    res.redirect(redirect);
  }
);

router.post('/auth/openid/return',
  function(req, res, next) {
    passport.authenticate('azuread-openidconneect', {
      response: res,
      failureRedirect
    })(req, res, next);
  },
  function(req, res) {
    res.redirect(redirect);
  }
);

router.get('/logout', function(req, res) {
  req.session.destroy(function(err) {
    req.logOut();
    res.redirect(destroySessionUrl);
  });
});

module.exports = router;

