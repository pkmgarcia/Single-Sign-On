import axios from 'axios';
import { baseURL } from './config';

const api = '/twitter';

const twitterInstance = axios.create({
  baseURL: `${baseURL}${api}`
});

const getLatestTweets = () => twitterInstance.get('/latest-tweets');

const postStatus = (status) => twitterInstance.post('/tweet', { status });

export {
  getLatestTweets,
  postStatus
};
