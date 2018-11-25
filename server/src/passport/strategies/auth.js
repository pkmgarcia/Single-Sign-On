const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const db = require('../../db');

const signInStrategy = new LocalStrategy(
  function(empNo, password, done) {
    const statement = `SELECT * FROM users WHERE emp_no=${empNo}`;
    db.query(statement, function(err, tuples){
      // If query returns an error
      if (err) return done(err);
      // If query returns nothing
      if (!tuples.length) {
        return done(null, false);
      }
      // Check if password matches
      const match = bcrypt.compareSync(password, tuples[0]);
      if (match) {
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
    });
  }
);

module.exports ={
  signInStrategy
};
