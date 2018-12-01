import axios from 'axios';

const api = '/aad';

const authAxios = axios.create({
  baseURL: api
});

authAxios.interceptors.request.use(request => {
  console.log('Requesting: ', request);
  return request;
});
authAxios.interceptors.response.use(response => {
  console.log('Response: ', response);
  return response;
});

const signIn = () => authAxios.get('/login');

const getMe = () => authAxios.get('/me');

export {
  signIn,
  getMe
};

