import React, { Component } from 'react';
import LoginForm from './LoginForm';
import { auth } from '../../modules/firebase';
import { withStyles } from '@material-ui/core/styles';
import styles from './AuthLayout.styles';

class AuthLayout extends Component {
  state = {
    email: '',
    password: ''
  }

  handlers ={
    handleChange: key => value => {
      this.setState({
        [key]: value
      });
    },
    submit: () => {
      auth.signInWithEmailAndPassword(this.state.email, this.state.password)
        .then(user => {
          console.log(user);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

  render() {
    const { classes } = this.props;
    const { email, password } = this.state;
    const { handlers } = this;

    return (
      <div className={classes.root}>
        <LoginForm
          email={email}
          password={password}
          handleEmail={handlers.handleChange('email')}
          handlePassword={handlers.handleChange('password')}
          submit={handlers.submit}
        />
      </div>
    )
  }

};

export default withStyles(styles, { withTheme: true })(AuthLayout);