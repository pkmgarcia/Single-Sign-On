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
    console.log(`[db] Fetching employee using oid: ${oid}`);

    /*
     * SELECT * FROM employees
     *   JOIN dept_emp
     *     ON employees.emp_no=dept_emp.emp_no
     *   JOIN departments
     *     ON dept_emp.dept_no=departments.dept_no
     *   WHERE employees.oid='oid'
    */
    const statement = 'SELECT * FROM employees JOIN dept_emp ON employees.emp_no=dept_emp.emp_no JOIN departments ON dept_emp.dept_no=departments.dept_no WHERE employees.oid=\'' + oid + '\'';

    connection.query(statement, (err, tuples) => {
      // Database error
      if (err) reject(err);

      // Incorrect amount of users
      if(!tuples) {
        reject(false);
      }

      else {
        const departments = [];
        let department;
        for(let i = 0; i < tuples.length; i++) {
          department = tuples[i].dept_name;
          departments.push(department);
        }

        // Get employee
        const tuple = tuples[0];
        const employee = {
          empNo: tuple.emp_no,
          birthDate: tuple.birth_date,
          firstName: tuple.first_name,
          lastName: tuple.last_name,
          gender: tuple.gender,
          hireDate: tuple.hire_date,
          departments,
          oid,
          userPrincipleName: tuple.user_principle_name,
          oauth: {
            tokenType: tuple.token_type,
            expiresIn: tuple.expires_in,
            extExpiresIn: tuple.ext_expires_in,
            expiresOn: tuple.expires_on,
            accessToken: tuple.access_token,
            refreshToken: tuple.refresh_token,
            idToken: tuple.id_token
          }
        };
        console.log(`[db] Found employee #: ${employee.empNo}`);
        if (employee.oauth.accessToken) console.log(`[db] Access Token Length: ${employee.oauth.accessToken.length}`);
        resolve(employee);
      }
    });
  })
};


const getEmployeeUsingEmployeeNumber = (empNo) => {
  return new Promise((resolve, reject) => {
    console.log(`[db] Fetching employee using empNo: ${empNo}`);
   /*
     * SELECT * FROM employees
     *   JOIN dept_emp
     *     ON employees.emp_no=dept_emp.emp_no
     *   JOIN departments
     *     ON dept_emp.dept_no=departments.dept_no
     *   WHERE employees.emp_no='emp_no'
    */ const statement = 'SELECT * FROM employees ' +
                           'JOIN dept_emp ' + 
                             'ON employees.emp_no=dept_emp.emp_no ' + 
                           'JOIN departments ' +
                             'ON dept_emp.dept_no=departments.dept_no ' +
                           'WHERE employees.emp_no=' + empNo;

    connection.query(statement, (err, tuples) => {
      // Database error
      if (err) reject(err);

      // Incorrect amount of users
      if(!tuples) {
        reject(false);
      }

      else {
        const departments = [];
        let department;
        for(let i = 0; i < tuples.length; i++) {
          department = tuples[i].dept_name;
          departments.push(department);
        }

        // Get employee
        const tuple = tuples[0];
        const employee = {
          empNo: tuple.emp_no,
          birthDate: tuple.birth_date,
          firstName: tuple.first_name,
          lastName: tuple.last_name,
          gender: tuple.gender,
          hireDate: tuple.hire_date,
          oid: tuple.oid,
          departments,
          userPrincipleName: tuple.user_principle_name,
          oauth: {
            tokenType: tuple.token_type,
            expiresIn: tuple.expires_in,
            extExpiresIn: tuple.ext_expires_in,
            expiresOn: tuple.expires_on,
            accessToken: tuple.access_token,
            refreshToken: tuple.refresh_token,
            idToken: tuple.id_token
          }
        };
        console.log(`[db] Found employee #: ${employee.empNo}`);
        resolve(employee);
      }
    });
  })
};

const getEmployees = (lowerBound, limit) => {
  return new Promise((resolve, reject) => {
    console.log(`[db] Fetching ${limit} employees starting from empNo: ${lowerBound}`);
   /*
     * SELECT * FROM employees
     *   JOIN dept_emp
     *     ON employees.emp_no=dept_emp.emp_no
     *   JOIN departments
     *     ON dept_emp.dept_no=departments.dept_no
     *   WHERE employees.emp_no='emp_no'
     *   ORDER BY emp_no ASC
     *   LIMIT limit
    */
    const statement = 'SELECT * FROM employees ' +
                        'JOIN dept_emp ' + 
                          'ON employees.emp_no=dept_emp.emp_no ' + 
                        'JOIN departments ' +
                          'ON dept_emp.dept_no=departments.dept_no ' +
                        'WHERE employees.emp_no>=' + lowerBound+ ' ' +
                        'ORDER BY employees.emp_no ASC ' +
                        'LIMIT ' + limit;

    connection.query(statement, (err, tuples) => {
      // Database error
      if (err) reject(err);
      else {
        // Convert resulting employees
        const employees = [];
        let employee = { };
        let tuple = { };
        for(let i = 0; i < tuples.length; i++) {
          tuple = tuples[i];
          employee = {
            empNo: tuple.emp_no,
            birthDate: tuple.birth_date,
            firstName: tuple.first_name,
            lastName: tuple.last_name,
            gender: tuple.gender,
            hireDate: tuple.hire_date,
            oid: tuple.oid,
            department: tuple.dept_name,
            userPrincipleName: tuple.user_principle_name,
            oauth: {
              tokenType: tuple.token_type,
              expiresIn: tuple.expires_in,
              extExpiresIn: tuple.ext_expires_in,
              expiresOn: tuple.expires_on,
              accessToken: tuple.access_token,
              refreshToken: tuple.refresh_token,
              idToken: tuple.id_token
            }
          };
          employees.push(employee);
        }
        console.log(`[db] Got ${employees.length} employees`);
        resolve(employees);
      }
    });
  });
};

const getSalariesUsingEmployeeNumber = (empNo) => {
  return new Promise((resolve, reject) => {
    const statement = `SELECT * FROM salaries WHERE emp_no=${empNo}`;
    
    connection.query(statement,
      function(err, tuples) {
        if (err) reject(err);
        resolve(tuples);
      }
    );
  });
}

const getDepartmentsUsingEmployeeNumber = (empNo) => {
  return new Promise((resolve, reject) => {
    const statement = `SELECT departments.dept_name FROM employees JOIN dept_emp ON employees.emp_no=dept_emp.emp_no JOIN departments ON dept_emp.dept_no=departments.dept_no WHERE employees.emp_no=${empNo}`;

    connection.query(statement,
      function(err, tuples) {
        if (err) reject(false);
        resolve(tuples)
      });
  });
};

const addOIDToEmployee = (oid, empNo) => {
  return new Promise((resolve, reject) => {
  
    const statement = `UPDATE employees SET oid='${oid}' WHERE emp_no=${empNo}`;
  
    connection.query(statement,
      function(err, tuples) {
        if (err) reject(err);
        resolve(true);
      }
    );
  });
};

const addOAuthToEmployee = (token, empNo) => {
  return new Promise((resolve, reject) => {
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
        if (err) reject(err);
        resolve(true);
      }
    );
  })
};

module.exports = {
  getEmployeeUsingOID,
  getEmployeeUsingEmployeeNumber,
  getEmployees,
  getSalariesUsingEmployeeNumber,
  getDepartmentsUsingEmployeeNumber,
  addOIDToEmployee,
  addOAuthToEmployee
};

