import axios from 'axios';
import { baseURL } from './config';

const employeeInstance = axios.create({
  baseURL: baseURL + '/employee'
});

const getEmployee = emp_no => employeeInstance.get(`/${emp_no}`);
// const updateEmployee = employee => employeeInstance.put();
// const insertEmployee = employee => employeeInstance.post();
// const deleteEmployee = emp_no => employeeInstance.delete();

export {
  getEmployee
};
