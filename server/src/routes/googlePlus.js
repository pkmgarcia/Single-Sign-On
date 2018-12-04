const router = require('express').Router();
const passport = require('../passport');
const config = require('../config');

// auth with google+
router.get(
    "/google",
    passport.authenticate("google", {
      scope: ["profile"]
    })
  );

router.get("/google/redirect", passport.authenticate("google"), (req, res) => {
    //res.send(req.user);
    res.redirect("/profile");
});
 
router.get("/profile", (req, res) => {
    res.send("Userinfo: " + req);
});

module.exports = router;

