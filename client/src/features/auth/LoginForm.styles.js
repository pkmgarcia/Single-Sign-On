const styles = theme => ({
  root: {
    display: 'flex',
    maxWidth: '375px',
    minWidth: '275px',
    width: '50%',
    backgroundColor: 'white'
  },
  form: {
    display: 'flex',
    flexFlow: 'column nowrap',
    justifyContent: 'center',
    alignItems: 'center',
    margin: theme.spacing.unit * 2.5,
    width: '100%',
    '& > *': {
      marginTop: theme.spacing.unit * 1.5,
      marginBottom: theme.spacing.unit * 1.5,
      width: '100%'
    }
  },
  login: {
    color: theme.palette.primary.dark
  },
  register: {
    color: theme.palette.secondary.dark
  },
  errorMessage: {
    color: theme.palette.error.main
  }
});

export default styles;