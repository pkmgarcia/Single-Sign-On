const router = require('express').Router();
const passport = require('../passport');
const config = require('../config');
const graph = require('../graph');
const db = require('../db');

// OAuth
router.get('/login',
  function(req, res, next) {
    passport.authenticate('azuread-openidconnect', { failureRedirect: '/' })(req, res, next);  },
  function(req, res) {
    console.log(`[/login] Passed.`);
    res.redirect('/');
  }
);

router.post('/auth/openid/callback', passport.authenticate('azuread-openidconnect', { failureRedirect: '/' }),
  function(req, res) {
    console.log(`[/openid/callback] Passed.`);
    res.redirect('/');
  }
);

router.get('/logout', function(req, res) {
  console.log(`[/logout] Passed.`);
  req.session.destroy(function(err) {
    req.logout();
    res.end();
  });
});

module.exports = router;

