import React, { Component } from 'react';
import {
  BrowserRouter,
  Switch,
  Route
} from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { withStyles } from '@material-ui/core/styles';
import MainLayout from './features/MainLayout';
import SplashLayout from './features/splash/SplashLayout';
import LogoutLayout from './features/logout/LogoutLayout';
import theme from './modules/theme';
import styles from './App.styles';
import { connect } from 'react-redux';
import { userTypes } from './modules/redux/reducers/user';

class App extends Component {
  render() {
    const { classes } = this.props;

    /*
    const layout = () => (this.props.user
      ? (<MainLayout
           user={this.props.user}
           deleteUser={this.props.deleteUser}
         />)
      : <SplashLayout setUser={this.props.setUser}/>
    );
    */
    const defaultUser = {
      empNo: '100000',
      firstName: 'Patrick',
      lastName: 'Garcia'
    };
    const layout = () => <MainLayout user={defaultUser} deleteUser={this.props.deleteUser} />;

    return (
      <CssBaseline>
        <MuiThemeProvider theme={theme}>
          <BrowserRouter>
            <div className={classes.root}>
              <Switch>
                <Route exact path="/logout" component={LogoutLayout}/>
                <Route path="/" component={layout}/>
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
  setUser: user => dispatch({ type: userTypes.SET_USER, user }),
  deleteUser:  () => dispatch({ type: userTypes.SET_USER, user: null })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(App));
