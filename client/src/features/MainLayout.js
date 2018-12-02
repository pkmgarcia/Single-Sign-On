import React, { Component } from 'react';
import {
  Switch,
  Route,
  withRouter
} from 'react-router-dom';
import { Drawer } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Divider from '@material-ui/core/Divider';
import DashboardLayout from './dashboard/DashboardLayout';
import TwitterLayout from './twitter/TwitterLayout';
import { withStyles } from '@material-ui/core/styles';
import { signOut } from '../modules/axios/auth';
import styles from './MainLayout.styles';

class MainLayout extends Component {
  state = {
    openDrawer: false
  }

  toggleDrawer = () => {
    this.setState(prevState => ({
      openDrawer: !prevState.openDrawer
    }))
  }

  logout = () => {
    signOut()
      .then(() => {
        this.props.deleteUser();
        this.props.history.push('/logout');
      })
  }

  render() {
    const { classes } = this.props;

    const drawerContent = (
      <div className={classes.drawerContent}>
        {JSON.stringify(this.props.user)}
      </div>
    );

    return (
      <div className={classes.root}>
        <AppBar
          position="static"
        >
          <Toolbar
            className={classes.toolbar}
          >
            <IconButton
              onClick={this.toggleDrawer}
              className={classes.menuButton}
              aria-label="Menu"
            >
              <MenuIcon />
            </IconButton>
            <Button
              onClick={this.logout}
              className={classes.logoutButton}
            >
              Log Out
            </Button>
          </Toolbar>
        </AppBar>
        <Drawer
          anchor="left"
          open={this.state.openDrawer}
          onClose={() => this.setState({ openDrawer: false })}
        >
          {drawerContent}
        </Drawer>
        <Switch>
          <Route path="/twitter" component={TwitterLayout}></Route>
          <Route path="/" component={DashboardLayout}></Route>
        </Switch>
      </div>
    )
  }
}

export default withStyles(styles, { withTheme: true })(withRouter(MainLayout));
