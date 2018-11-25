import axios from 'axios';
import { baseURL } from './config';

const api = 'auth'

const authAxios = axios.create({
  baseURL: `${baseURL}/${api}`
});

const signIn = (empNo, password) => authAxios.post('/login', {
  empNo,
  password
});

export {
  signIn
};
