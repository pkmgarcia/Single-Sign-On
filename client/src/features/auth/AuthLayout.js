import React, { Component } from 'react';
import LoginForm from './LoginForm';
import Typography from '@material-ui/core/Typography';
import Hidden from '@material-ui/core/Hidden';
import styles from './AuthLayout.styles';
import { auth } from '../../modules/firebase';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { userTypes } from '../../modules/redux/reducers/user';

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
          this.props.setUser(user);
        })
        .catch(error => {
          this.setState({ error });
        });
    }
  }

  render() {
    const { classes } = this.props;
    const { email, password, error } = this.state;
    const { handlers } = this;

    return (
      <div className={classes.root}>
        <Hidden smDown>
          <div className={classes.description}>
              <Typography
                variant="h1"
              > Payroll
              </Typography>
              <Typography
                variant="h5"
              > A new way to interact with your salary history!
              </Typography>
          </div>
        </Hidden>
        <LoginForm
          email={email}
          password={password}
          error={error}
          handleEmail={handlers.handleChange('email')}
          handlePassword={handlers.handleChange('password')}
          submit={handlers.submit}
        />
      </div>
    )
  }
};

const mapDispatchToProps = dispatch => ({
  setUser: user => dispatch({ type: userTypes.SET_USER, user })
})

export default connect(
  null,
  mapDispatchToProps
)(withStyles(styles, { withTheme: true })(AuthLayout));