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
        userName: 'username',
        text: 'text here'
      },
      {
        userName: 'two',
        text: 'text here'
      },
      {
        userName: 'three',
        text: 'text here'
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
    console.log("initial_oauth", initiateTwitterOAuth);
    initiateTwitterOAuth().then(res => {
      this.setState({userName : res});
    });
    console.log("latest_tweets", getLatestTweets);
    getLatestTweets().then(res => {
      this.setState({text : res});
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
              key={index}
            >
              {/*HTML/JSX here to display tweets*/}
                <h6>{tweet.userName}</h6>
                <p>{tweet.text}</p>
            </Paper>
          );
        })}
      </div>
    )
  }
}

export default withWidth()(withStyles(styles, { withTheme: true })(TwitterLayout));

