const mysql = require('mysql');

const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
});
connection.connect();

const getEmployeeUsingOID = (oid) => {
  const statement = `SELECT * FROM employees WHERE oid='${oid}'`;

  connection.query(statement,
    function(err, tuples) {
      // Database error
      if (err) return false;

      // Incorrect amount of users
      if(tuples.length !== 1) return false;

      // Get employee
      const tuple = tuples[0];
      const employee = {
        empNo: tuple.emp_no,
        birthDate: tuple.birth_date,
        firstName: tuple.first_name,
        lastName: tuple.last_name,
        gender: tuple.gender,
        hireDate: tuple.hire_date,
        oid
      };

      return employee;
    }
  );

  return false;
};

const addOIDToEmployee = (oid, empNo) => {
  const statement = `UPDATE employees SET oid='${oid}' WHERE emp_no=${empNo}`;

  connection.query(statement,
    function(err, tuples) {
      if (err) return false;
      return true;
    }
  );
};

module.exports = {
  getEmployeeUsingOID,
  addOIDToEmployee
};

