const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const db = require('../../db');

const signInStrategy = new LocalStrategy({
    usernameField: 'empNo',
    passwordField: 'password'
  },
  function(empNo, password, done) {
    const statement = `SELECT * FROM employees WHERE emp_no=${empNo}`;
    db.query(statement, function(err, tuples){
      // If query returns an error
      if (err) {
        return done(err);
      }
      // If query returns nothing
      if (!tuples.length) {
        return done(null, false);
      }

      // Check if user has an account
      if (tuples[0].has_account) {
        // Check if password matches
        const match = bcrypt.compareSync(password, tuples[0].password);
        if (!match) {
          return done(null, false);
        } else {
          const employee = tuples[0];
          const user = {
            empNo: employee.emp_no,
            first_name: employee.first_name,
            last_name: employee.last_name
          };
          return done(null, user);
        }
      }
      // User doesn't have an account
      else {
        return done(null, false);
      }
    });
  }
);

module.exports ={
  signInStrategy
};
