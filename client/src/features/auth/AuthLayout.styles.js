const styles = theme => ({
  root: {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundImage: `linear-gradient(${theme.palette.primary.light}, ${theme.palette.secondary.main})`,
    overflow: 'hidden'
  },
  description: {
    '& > *': {
      margin: '8px 16px',
    }
  }
});

export default styles;