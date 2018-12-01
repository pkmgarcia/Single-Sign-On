const styles = theme => ({
  root: {
    display: 'flex',
    flexFlow: 'column wrap',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: theme.palette.primary.main,
    overflow: 'hidden',
    color: theme.palette.textPrimary.main
  },
  description: {
    '& > *': {
      margin: '8px 16px',
    }
  }
});

export default styles;