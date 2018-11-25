import React, { Component } from 'react';
import LoginForm from './LoginForm';
import Typography from '@material-ui/core/Typography';
import Hidden from '@material-ui/core/Hidden';
import styles from './AuthLayout.styles';
import { signIn } from '../../modules/axios/auth';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { userTypes } from '../../modules/redux/reducers/user';

class AuthLayout extends Component {
  state = {
    empNo: '',
    password: ''
  }

  handlers ={
    handleChange: key => value => {
      this.setState({
        [key]: value
      });
    },
    submit: (empNo, password) => signIn(this.state.empNo, this.state.password)
  }

  render() {
    const { classes } = this.props;
    const { empNo, password, error } = this.state;
    const { handlers } = this;

    return (
      <div className={classes.root}>
        <Hidden smDown>
          <div className={classes.description}>
              <Typography
                variant="h1"
              > Single Sign-On
              </Typography>
              <Typography
                variant="h5"
              > Access multiple applications with <strong>one</strong> set of credentials
              </Typography>
          </div>
        </Hidden>
        <LoginForm
          empNo={empNo}
          password={password}
          error={error}
          handleEmpNo={handlers.handleChange('empNo')}
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