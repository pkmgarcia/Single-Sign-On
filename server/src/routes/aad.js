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
    res.redirect('/');
  }
);

router.post('/auth/openid/callback', passport.authenticate('azuread-openidconnect', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/');
  }
);

router.get('/logout', function(req, res) {
  req.session.destroy(function(err) {
    req.logOut();
    res.redirect('/');
  });
});

/*
router.get('/me',
  passport.authenticate('oauth-bearer',{ session: true }),
  function(req, res) {
    console.log('hello');
    graph.user.getMe(req.user.accessToken)
      .then(result => {
        console.log(result);
        console.log(req.user);

        res.send(result);
      }
    );
  }
);
*/

router.get('/me',
  function(req, res) {
    if (req.isAuthenticated()) {
      graph.user.getMe(req.user.oauth.accessToken)
        .then(user => {
          db.getEmployeeUsingOID(user.id)
            .then(emp => {
              if (emp) {
                const employee = {
                  empNo: emp.empNo,
                  firstName: emp.firstName,
                  lastName: emp.lastName
                };
                res.send(employee);
              }
              else {
                res.redirect('/');
              };
            }
          );
        }
      );
    }
    else {
      res.redirect('/');
    }
  }
);

module.exports = router;

