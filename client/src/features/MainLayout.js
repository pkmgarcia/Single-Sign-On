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
import GooglePlusLayout from './google/GooglePlusLayout';
import JenkinsLayout from './jenkins/JenkinsLayout';
import SalariesLayout from './salaries/SalariesLayout';
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

    console.log(this.props.user);

    const navLinks = (
      <div className={classes.navLinks}>
        <NavLink
          className={classes.navLink}
          activeClassName={classes.activeNavLink}
          to="/payroll"
        >
          <Button
            fullWidth
            color="inherit"
            variant="flat"
            onClick={this.toggleDrawer}
          > Payroll </Button>
        </NavLink>
        {employee.departments.find(el => el === 'Marketing')
          ? (<NavLink
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
             </NavLink>)
          : null}
        {employee.departments.find(el => el === 'Human Resources')
          ? (<NavLink
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
             </NavLink>)
          : null}
        {employee.departments.find(el => el === 'Development')
          ? (<NavLink
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
             </NavLink>)
          : null}
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
          <Route path="/payroll" render={() => <SalariesLayout user={this.props.user} />} />
          <Route path="/twitter" render={() => <TwitterLayout user={this.props.user} />} />
          <Route path="/jenkins" render={() => <JenkinsLayout user={this.props.user} />} />
          <Route path="/employees" render={() => <EmployeesLayout user={this.props.user} />} />
          <Redirect exact path="/" to="/payroll"/>
        </Switch>
      </div>
    )
  }
}

export default withStyles(styles, { withTheme: true })(withRouter(MainLayout));
