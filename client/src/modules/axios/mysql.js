import axios from 'axios';

const api = '/mysql';

const mysqlAxios = axios.create({
  baseURL: api
});

mysqlAxios.interceptors.request.use(request => {
  console.log('Requesting: ', request);
  return request;
});
mysqlAxios.interceptors.response.use(response => {
  console.log('Response: ', response);
  return response;
});

const getEmployeeByID = (empNo) => mysqlAxios.get(`/employee/${empNo}`);

const getEmployees = (offset) => mysqlAxios.get(`/employees/${offset}`);

export {
  getEmployeeByID,
  getEmployees
};

