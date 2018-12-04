const router = require('express').Router();
const passport = require('../passport');
const config = require('../config');
const graph = require('../graph');
const db = require('../db');

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
            });
        });
    }
    else {
      res.status(401).redirect('/');
    }
  }
);

router.get('/groups',
  function(req, res) {
    if (req.isAuthenticated()) {
      graph.user.getMemberOf(req.user.oauth.accessToken)
        .then(groups => {
          console.log(groups);
        });
    }
  }
);

router.post('/create',
  function(req, res) {
    if (req.isAuthenticated()) {
      graph.superadmin.createUser(req.body.empNo)
        .then(result => res.send(result));
    }
  }
);

module.exports = router;

