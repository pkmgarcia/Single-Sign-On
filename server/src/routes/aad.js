const router = require('express').Router();
const passport = require('../passport');
const config = require('../config');

router.get('/login',
  function(req, res, next) {
    passport.authenticate('azuread-openidconnect', { failureRedirect: '/failone' })(req, res, next);  },
  function(req, res) {
    res.redirect('/');
  }
);

router.post('/auth/openid/callback', passport.authenticate('azuread-openidconnect', { failureRedirect: '/failtwo' }),
  function(req, res) {
    res.send(req.user);
  }
);

router.get('/logout', function(req, res) {
  req.session.destroy(function(err) {
    req.logOut();
    res.redirect('/');
  });
});

module.exports = router;

