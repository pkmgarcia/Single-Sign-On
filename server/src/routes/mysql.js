const express = require('express');
const router = express.Router();

// Setup mysql
const mysql = require('mysql');
const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
});
connection.connect();

// Test Route
router.get('/test', function (req, res) {
  connection.query('SELECT COUNT(*) FROM employees', function (err, result) {
    res.send(result);
  });
});

// Read
router.get('/employee/:emp_no', function (req, res) {
  const statement = 'SELECT * FROM employees WHERE emp_no=' + req.params.emp_no;

  connection.query(statement, function (err, result) {
    res.send(result);
  });
});

module.exports = router;

