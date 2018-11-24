import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import styles from './LoginForm.styles';

const LoginForm = (props) => {
  const { classes } = props;
  const { email, password, error } = props;
  const { handleEmail, handlePassword, submit } = props;

  const errorMessage = error
  ? (
    <Typography
      className={classes.errorMessage}
      variant="body1"
      align="center"
    > {error.message}
    </Typography>
    )
  : null;

  return (
    <Paper className={classes.root}>
      <form className={classes.form}>
        <Typography
          variant="h5"
          align="center"
        > Sign In
        </Typography>
        <FormControl>
          <TextField
            id="email"
            label="Email"
            type="email"
            value={email}
            variant="outlined"
            onChange={event => handleEmail(event.target.value)}
          />
        </FormControl>
        <FormControl>
          <TextField
            id="password"
            label="Password"
            type="password"
            value={password}
            variant="outlined"
            onChange={event => handlePassword(event.target.value)}
          />
        </FormControl>
        <Button
          className={classes.login}
          onClick={submit}
          variant="outlined"
        > Log In
        </Button>
        <div>
          {errorMessage}
        </div>
        <div className={classes.divider}/>
        <Button
          className={classes.register}
        > Register
        </Button>
      </form>
    </Paper>
  )
};

export default withStyles(styles, { withTheme: true })(LoginForm);