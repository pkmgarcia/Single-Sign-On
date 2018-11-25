const router = require('express').Router();
const passport = require('../passport');

router.post('/login',
  passport.authenticate('local', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/');
  }
);

module.exports = router;
