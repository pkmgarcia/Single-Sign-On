import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import Hidden from '@material-ui/core/Hidden';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import styles from './TwitterLayout.styles';
import { withStyles } from '@material-ui/core/styles';
import withWidth from '@material-ui/core/withWidth';
import {initiateTwitterOAuth, getLatestTweets} from '../../modules/axios/twitter';

class TwitterLayout extends Component {
  state = {
    tweets: [
      {
        userName: 'username1',
        text: 'text-content1',
        postdate: 'created time1'
      },
      {
        userName: 'username2',
        text: 'text-content2',
        postdate: 'created time2'
      },
      {
        userName: 'username3',
        text: 'text-content3',
        postdate: 'created time3'
      }
    ]
  }

  /*
  default = {
    employees: [
      {
        empNo: 0,
        firstName: 'Patrick',
        lastName: 'Garcia',
        department: 'Sales',
        userPrincipalName: 'pkmgarcia@pkmgarciagmail.onmicrosoft.com'
      },
      {
        empNo: 10,
        firstName: 'Zubia',
        lastName: 'Ahmad',
        department: 'Marketing'
      }
    ]
  };
  */

  handleChange = (key) => (value) => this.setState({ key: value });

  componentDidMount() {
    getLatestTweets().then(res => {
      this.setState({userName : res.data.statuses[0].user.screen_name});
      this.setState({text : res.data.statuses[0].text});
      this.setState({postdate : res.data.statuses[0].created_at});
    });
    // Fetch tweets here
  }

  render() {
    const { classes } = this.props;

    let width = this.props.width;
    let primaryVariant = '';
    switch (width) {
      case 'xs':
        primaryVariant = 'h5';
        break;
      case 'sm':
        primaryVariant = 'h4';
        break;
      case 'md':
        primaryVariant = 'h3';
        break;
      case 'lg':
        primaryVariant = 'h2';
        break;
      case 'xl':
        primaryVariant = 'h2';
        break;
      default:
        primaryVariant = 'h5';
        break;
    }

    return (
      <div className={classes.root}>
        <Typography
          variant={primaryVariant}
          gutterBottom
        > Twitter
        </Typography>
        <Divider />
        {this.state.tweets.map((tweet, index) => {
          return (
            <Paper
              key={index} elevation="3"
            >
              <Typography variant="h6" component="h3" color="primary">
                Tweet: {tweet.text}
              </Typography>
              <Typography variant="body1" component="p" color="textPrimary">
                Posted by: {tweet.userName}
              </Typography>
              <Typography component="p">
                Posted on: {tweet.postdate}
              </Typography>
              <Typography component="p">
                {}
              </Typography>
            </Paper>
          );
        })}
      </div>
    )
  }
}

export default withWidth()(withStyles(styles, { withTheme: true })(TwitterLayout));

