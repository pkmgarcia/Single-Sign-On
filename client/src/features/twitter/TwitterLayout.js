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
        userName: '',
        text: '',
        postdate: ''
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
      console.log("username", res.data.statuses[0].user.screen_name);
      console.log("postdate", res.data.statuses[0].created_at);
      this.setState({text : res.data.statuses[0].text}, () => {
        console.log("text", res.data.statuses[0].text);
      });
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

