const styles = theme => ({
  root: {
    width: '100%',
    height: '100%'
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  menuButton: {
    color: 'white'
  },
  logoutButton: {
    color: 'white'
  },
  drawer: {
    height: '100%'
  },
  drawerProfile: {
    display: 'flex',
    flexFlow: 'column nowrap',
    padding: '8px 16px',
    backgroundColor: theme.palette.secondary.light
  },
  navLinks: {
    display: 'flex',
    flexFlow: 'column nowrap',
    justifyContent: 'center',
    alignItems: 'stretch',
    padding: '16px 0'
  },
  navLink: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    padding: '8px 0'
  },
  activeNavLink: {
    color: theme.palette.secondary.main,
    backgroundColor: theme.palette.primary.main
  }
});

export default styles
