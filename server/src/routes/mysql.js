const express = require('express');
const router = express.Router();
const db = require('../db');

router.use(function(req, res, next) {
  if (!req.isAuthenticated()) {
    res.status(401).redirect('/');
  }
  else {
    next()
  }
});

router.get('/employee/:emp_no', function (req, res) {
  const statement = 'SELECT * FROM employees WHERE emp_no=' + req.params.emp_no;

  db.query(statement,
    function (err, result) {
      res.send(result);
    });
});

router.get('/employees/:offset', function (req, res) {
  const statement = 'SELECT * FROM employees WHERE emp_no>' + req.params.offset + ' LIMIT 10';

  db.query(statement,
    function (err, result) {
      res.send(result);
    });
});

module.exports = router;

