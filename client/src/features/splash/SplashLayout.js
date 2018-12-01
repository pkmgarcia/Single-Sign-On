import React from 'react';
import Typography from '@material-ui/core/Typography';
import styles from './SplashLayout.styles';
import { withStyles } from '@material-ui/core/styles';
import withWidth from '@material-ui/core/withWidth';

const splashLayout = (props) => {
  const { classes } = props;

  let width = props.width;
  let primaryVariant = '';
  switch (width) {
    case 'xs':
      primaryVariant = 'h4';
      break;
    case 'sm':
      primaryVariant = 'h3';
      break;
    case 'md':
      primaryVariant = 'h2';
      break;
    case 'lg':
      primaryVariant = 'h1';
      break;
    case 'xl':
      primaryVariant = 'h1';
      break;
    default:
      primaryVariant = 'h4';
      break;
  }

  return (
    <div className={classes.root}>
      <Typography
        variant={primaryVariant}
        align="center"
        color="inherit"
        noWrap
        gutterBottom
      > Single Sign-On
      </Typography>
      <Typography
        align="center"
        color="inherit"
        noWrap
        gutterBottom
      > Authenticating...
      </Typography>
    </div>
  );
};

export default withWidth()(withStyles(styles, { withTheme: true })(splashLayout));
