const router = require('express').Router();
const passport = require('../passport');

router.post('/login',
  passport.authenticate('local', { failureRedirect: '/Single-Sign-On/login' }),
  function(req, res) {
    res.redirect('/Single-Sign-On/main');
  }
);

module.exports = router;
