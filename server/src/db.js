const mysql = require('mysql');

const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
});
connection.connect();

const getEmployeeUsingOID = (oid) => {
  return new Promise((resolve, reject) => {
    console.log(`[db] Fetching employee using ${oid}`);
    const statement = `SELECT * FROM employees WHERE oid='${oid}'`;
  
    connection.query(statement, (err, tuples) => {
      // Database error
      if (err) reject(err);

      // Incorrect amount of users
      if(tuples.length !== 1) {
        reject(false);
      }

      else {
        // Get employee
        const tuple = tuples[0];
        const employee = {
          empNo: tuple.emp_no,
          birthDate: tuple.birth_date,
          firstName: tuple.first_name,
          lastName: tuple.last_name,
          gender: tuple.gender,
          hireDate: tuple.hire_date,
          oauth: {
            tokenType: tuple.token_type,
            expiresIn: tuple.expires_in,
            extExpiresIn: tuple.ext_expires_in,
            expiresOn: tuple.expires_on,
            accessToken: tuple.access_token,
            refreshToken: tuple.refresh_token,
            idToken: tuple.id_token
          },
          oid
        };
        console.log(`[db] Found employee #: ${employee.empNo}`);
        resolve(employee);
      }
    });
  })
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

const addOAuthToEmployee = (token, empNo) => {
  let statement = 'UPDATE employees SET '
    + 'token_type=\'' + token.token_type + '\', '
    + 'expires_in=\'' + token.expires_in + '\', '
    + 'ext_expires_in=\'' + token.ext_expires_in + '\', '
    + 'expires_on=\'' + token.expires_on + '\', '
    + 'access_token=\'' + token.access_token+ '\', '
    + 'refresh_token=\'' + token.refresh_token + '\', '
    + 'id_token=\'' + token.id_token + '\' '
    + 'WHERE emp_no=' + empNo;

  connection.query(statement,
    function(err, tuples) {
      if (err) return false;
      return true;
    }
  );
};

module.exports = {
  getEmployeeUsingOID,
  addOIDToEmployee,
  addOAuthToEmployee
};

