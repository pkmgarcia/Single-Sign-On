import axios from 'axios';
import { baseURL } from './config';

const api = '/twitter';

const twitterInstance = axios.create({
  baseURL: `${baseURL}${api}`
});

const initiateTwitterOAuth = () => twitterInstance.get('/oauth');

export {
  initiateTwitterOAuth
};
