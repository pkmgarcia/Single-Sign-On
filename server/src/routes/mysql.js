const express = require('express');
const router = express.Router();
const db = require('../db');

// Read
router.get('/employee/:emp_no', function (req, res) {
  const statement = 'SELECT * FROM employees WHERE emp_no=' + req.params.emp_no;

  db.query(statement, function (err, result) {
    res.send(result);
  });
});

module.exports = router;

