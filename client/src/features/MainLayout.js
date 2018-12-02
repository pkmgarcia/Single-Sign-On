import React, { Component } from 'react';
import {
  Switch,
  Route,
  NavLink,
  Redirect,
  withRouter
} from 'react-router-dom';
import { Drawer } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import TwitterLayout from './twitter/TwitterLayout';
import JenkinsLayout from './jenkins/JenkinsLayout';
import EmployeesLayout from './employees/EmployeesLayout';
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

    const employee = this.props.user;
    const profile = this.props.user
    ? (<div className={classes.drawerProfile}>
         <Typography
           variant="h6"
           color="primary"
         > {employee.firstName} {employee.lastName}
         </Typography>
         <Typography
           variant="subtitle1"
           color="primary"
         > Emp. No.: {employee.empNo}
         </Typography>
       </div>)
    : null

    const navLinks = (
      <div className={classes.navLinks}>
        <NavLink
          className={classes.navLink}
          activeClassName={classes.activeNavLink}
          to="/twitter"
        >
          <Button
            fullWidth
            color="inherit"
            variant="flat"
            onClick={this.toggleDrawer}
          > Twitter </Button>
        </NavLink>
        <NavLink
          className={classes.navLink}
          activeClassName={classes.activeNavLink}
          to="/employees"
        >
          <Button
            fullWidth
            color="inherit"
            variant="flat"
            onClick={this.toggleDrawer}
          > Employees </Button>
        </NavLink>
        <NavLink
          className={classes.navLink}
          activeClassName={classes.activeNavLink}
          to="/jenkins"
        >
          <Button
            fullWidth
            color="inherit"
            variant="flat"
            onClick={this.toggleDrawer}
          > Jenkins </Button>
        </NavLink>
      </div>
    );

    const drawerContent = (
      <div className={classes.drawer}>
        {profile}
        <Divider />
        {navLinks}
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
          <Route path="/twitter" component={TwitterLayout} />
          <Route path="/jenkins" component={JenkinsLayout} />
          <Route path="/employees" component={EmployeesLayout} />
          <Redirect exact path="/" to="/twitter"/>
        </Switch>
      </div>
    )
  }
}

export default withStyles(styles, { withTheme: true })(withRouter(MainLayout));
