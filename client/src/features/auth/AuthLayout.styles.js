const styles = theme => ({
  root: {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundImage: theme.palette.primary.main,
    overflow: 'hidden'
  },
  description: {
    '& > *': {
      margin: '8px 16px',
    }
  }
});

export default styles;