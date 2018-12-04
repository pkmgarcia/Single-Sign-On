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
      },
      {
        userName: 'username4',
        text: 'text-content4',
        postdate: 'created time4'
      },
      {
        userName: 'username5',
        text: 'text-content5',
        postdate: 'created time5'
      },
      {
        userName: 'username6',
        text: 'text-content6',
        postdate: 'created time6'
      },
      {
        userName: 'username7',
        text: 'text-content7',
        postdate: 'created time7'
      },
      {
        userName: 'username8',
        text: 'text-content8',
        postdate: 'created time8'
      },
      {
        userName: 'username9',
        text: 'text-content9',
        postdate: 'created time9'
      },
      {
        userName: 'username10',
        text: 'text-content10',
        postdate: 'created time10'
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
    getLatestTweets()
    .then(res => {
      console.log("res", res);
      const tweets = [];
      for(var i = 0; i < res.data.statuses.length; i++){
        const tweet = {
          userName: res.data.statuses[i].user.screen_name,
          text: res.data.statuses[i].text,
          postdate: res.data.statuses[i].created_at
        };  
        tweets.push(tweet);  
      }
      this.setState({ tweets });
    });  
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
              key={index}
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

