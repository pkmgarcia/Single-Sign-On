const express = require('express');
const router = express.Router();
const db = require('../db');
const graph = require('../graph');

/*
router.use(function(req, res, next) {
  if (!req.isAuthenticated()) {
    graph.getGroupOIDs(req.user.oauth.accessToken)
      .then(groups => {
        console.log(groups);
        res.status(401).redirect('/');
      });
  }
  else {
    next();
  }
});
*/

router.get('/me', function (req, res) {
  if (req.isAuthenticated()) {
    db.getEmployeeUsingOID(req.user.oid)
      .then(employee => {
        res.send(employee);
      });
  }
  else {
    res.end();
  }
});

router.get('/employee/:emp_no', function (req, res) {
  db.getEmployeeUsingEmployeeNumber(req.params.emp_no)
    .then(employee => {
      res.send(employee);
    });
});

router.get('/employee/:emp_no/departments', function (req, res) {
  db.getDepartmentsUsingEmployeeNumber(req.params.emp_no)
    .then(departments => {
      res.send(departments);
    });
});

router.get('/employee/:emp_no/salaries', function (req, res) {
  db.getSalariesUsingEmployeeNumber(req.params.emp_no)
    .then(salaries => {
      res.send(salaries);
    });
});

router.get('/employees/:offset', function (req, res) {
  db.getEmployees(req.params.offset, 10)
    .then(employees => {
      res.send(employees);
    });
});


module.exports = router;

