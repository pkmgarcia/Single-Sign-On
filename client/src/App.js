import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import MainLayout from './features/MainLayout';
import CssBaseline from '@material-ui/core/CssBaseline';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { withStyles } from '@material-ui/core/styles';
import SplashLayout from './features/splash/SplashLayout';
import theme from './modules/theme';
import styles from './App.styles';
import { connect } from 'react-redux';
import { userTypes } from './modules/redux/reducers/user';
import { signIn, getMe } from './modules/axios/auth';

class App extends Component {
  componentDidMount() {
    getMe()
      .then(res => {
        if (res) {
          this.props.setUser(res);
        }
        else {
          signIn();
        }
      }
    );
  }

  render() {
    const { classes } = this.props;

    const layout = this.props.user
      ? <MainLayout />
      : <SplashLayout />;

    return (
      <CssBaseline>
        <MuiThemeProvider theme={theme}>
          <BrowserRouter>
            <div className={classes.root}>
              {layout}
            </div>
          </BrowserRouter>
        </MuiThemeProvider>
      </CssBaseline>
    );
  }
}

const mapStateToProps = state => ({
  user: state.userReducer.user
});

const mapDispatchToProps = dispatch => ({
  setUser: user => dispatch({ type: userTypes.SET_USER, user })
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(App));
