const styles = theme => ({
  root: {
    display: 'flex',
    backgroundColor: 'white'
  },
  form: {
    display: 'flex',
    flexFlow: 'column nowrap',
    justifyContent: 'center',
    alignItems: 'center',
    margin: theme.spacing.unit * 2.5,
    '& > *': {
      marginTop: theme.spacing.unit * 1.5,
      marginBottom: theme.spacing.unit * 1.5
    }
  },
  divider: {
    width: '95%',
    height: '1px',
    padding: 0,
    backgroundColor: 'silver'
  }
});

export default styles;