import axios from 'axios';

const api = '/graph';

const graphAxios = axios.create({
  baseURL: api
});

graphAxios.interceptors.request.use(request => {
  console.log('Requesting: ', request);
  return request;
});
graphAxios.interceptors.response.use(response => {
  console.log('Response: ', response);
  return response;
});

const getMe = () => graphAxios.get('/me');

const createUser = (empNo) => graphAxios.post('/create', { empNo });

export {
  getMe,
  createUser
};

