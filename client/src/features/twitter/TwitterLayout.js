import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import Hidden from '@material-ui/core/Hidden';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/Button';
import ChatIcon from '@material-ui/icons/Chat';
import styles from './TwitterLayout.styles';
import { withStyles } from '@material-ui/core/styles';
import withWidth from '@material-ui/core/withWidth';
import {initiateTwitterOAuth, getLatestTweets} from '../../modules/axios/twitter';

class TwitterLayout extends Component {
  state = {
    tweets: [ ]
  }

  handleChange = (key) => (value) => this.setState({ key: value });

  componentDidMount() {    
    getLatestTweets()
      .then(res => {
        console.log(res);
        const tweets = [];
        for(let i = 0; i < res.data.statuses.length; i++){
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

    const tweeter = (
      <div className={classes.searchBar}>
        <TextField
          id="tweet"
          value={this.state.query}
          onChange={event => this.handleChange('query')(event.target.value)}
          variant="outlined"
          margin="normal"
          label="Tweet"
          fullWidth
        />
        <IconButton
          className={classes.searchButton}
          onClick={() => this.fetchEmployeeByID(this.state.query)}
          variant="contained"
          color="secondary"
        > <ChatIcon/>
        </IconButton>
      </div>
    );

    return (
      <div className={classes.root}>
        <Typography
          variant={primaryVariant}
          gutterBottom
        > Twitter
        </Typography>
        <Divider />

        <div className={classes.tweeter}>
          {tweeter}
        </div>

        <div className={classes.tweets}>
          {this.state.tweets.map((tweet, index) => {
            return (
              <Paper
                className={classes.tweet}
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
              </Paper>
            );
          })}
        </div>
      </div>
    )
  }
}

export default withWidth()(withStyles(styles, { withTheme: true })(TwitterLayout));

