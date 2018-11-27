import React from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import styles from './LoginForm.styles';

const LoginForm = (props) => {
  const { classes } = props;
  const { signIn } = props;

  return (
    <Button
      className={classes.login}
      href="/aad/login"
      variant="contained"
    > Sign In With Azure Active Directory
    </Button>
  )
};

export default withStyles(styles, { withTheme: true })(LoginForm);
