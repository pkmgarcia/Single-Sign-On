import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import AuthLayout from './features/auth/AuthLayout';
import { withStyles } from '@material-ui/core/styles';
import theme from './modules/theme';
import styles from './App.styles';
import { auth } from './modules/firebase';

class App extends Component {
  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        // TODO
      }
    })
  }

  render() {
    const { classes } = this.props;

    return (
      <CssBaseline>
        <MuiThemeProvider theme={theme}>
          <div className={classes.root}>
          <AuthLayout />
          </div>
        </MuiThemeProvider>
      </CssBaseline>
    );
  }
}

export default withStyles(styles)(App);
