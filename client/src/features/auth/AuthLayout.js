import React from 'react';
import LoginForm from './LoginForm';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Hidden from '@material-ui/core/Hidden';
import styles from './AuthLayout.styles';
import { signIn, getMe } from '../../modules/axios/auth';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { userTypes } from '../../modules/redux/reducers/user';

const authLayout = (props) => {
  const { classes } = props;

  const signedIn = () => {
    signIn()
      .then(res => {
        this.props.setUser(res);
      }
    );
  };

  const test = () => {
    getMe()
      .then(res => {
        console.log(res);
      });
  };

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
          > Access multiple applications through Microsoft's Azure Active Directory
          </Typography>
        </div>
      </Hidden>
      <LoginForm
        signIn={signedIn}
      />
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  setUser: user => dispatch({ type: userTypes.SET_USER, user })
})

export default connect(
  null,
  mapDispatchToProps
)(withStyles(styles, { withTheme: true })(authLayout));
