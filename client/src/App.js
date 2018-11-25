import React, { Component } from 'react';
import {
  BrowserRouter,
  Switch,
  Route
} from 'react-router-dom';
import MainLayout from './features/MainLayout';
import CssBaseline from '@material-ui/core/CssBaseline';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { withStyles } from '@material-ui/core/styles';
import AuthLayout from './features/auth/AuthLayout';
import theme from './modules/theme';
import styles from './App.styles';
import { connect } from 'react-redux';
import { userTypes } from './modules/redux/reducers/user';

class App extends Component {
  render() {
    const { classes } = this.props;

    return (
      <CssBaseline>
        <MuiThemeProvider theme={theme}>
          <BrowserRouter>
            <div className={classes.root}>
              <Switch>
                <Route path="/main" component={MainLayout}></Route>
                <Route path="/" component={AuthLayout}></Route>
              </Switch>
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
