import axios from 'axios';

const api = '/aad';

const authAxios = axios.create({
  baseURL: api
});

const signIn = () => authAxios.get('/login');

export {
  signIn
};

