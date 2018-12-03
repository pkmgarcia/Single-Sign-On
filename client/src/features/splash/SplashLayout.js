import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import withWidth from '@material-ui/core/withWidth';
import { getMe } from '../../modules/axios/graph';
import { userTypes } from '../../modules/redux/reducers/user';
import { connect } from 'react-redux';
import styles from './SplashLayout.styles';

class SplashLayout extends Component {
  state = {
    isAuthenticating: true 
  };

  componentDidMount() {
    getMe()
      .then(res => {
        if (res.status == '200' && res.data.empNo !== undefined) {
          this.props.setUser(res.data);
        }
        else {
          this.props.deleteUser();
          this.setState({ isAuthenticating: false });
        }
      }
    );
  }

  render() {
    const { classes } = this.props;
  
    let width = this.props.width;
    let primaryVariant = '';
    switch (width) {
      case 'xs':
        primaryVariant = 'h4';
        break;
      case 'sm':
        primaryVariant = 'h3';
        break;
      case 'md':
        primaryVariant = 'h2';
        break;
      case 'lg':
        primaryVariant = 'h1';
        break;
      case 'xl':
        primaryVariant = 'h1';
        break;
      default:
        primaryVariant = 'h4';
        break;
    }
  
    return (
      <div className={classes.root}>
        <Typography
          variant={primaryVariant}
          align="center"
          color="inherit"
          noWrap
          gutterBottom
        > Single Sign-On
        </Typography>
        {
          this.state.isAuthenticating
            ? (<Typography
                 align="center"
                 color="secondary"
                 noWrap
               > Authenticating...
               </Typography>)
            : (<Button
                 variant="outlined"
                 color="secondary"
                 href="aad/login"
               > Sign In </Button>)
        }
      </div>
    );
  }
};

const mapDispatchToProps = dispatch => ({
  deleteUser:  () => dispatch({ type: userTypes.SET_USER, user: null })
});

export default connect(
  null,
  mapDispatchToProps
)(withWidth()(withStyles(styles, { withTheme: true })(SplashLayout)));

