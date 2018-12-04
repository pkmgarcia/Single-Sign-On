import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Hidden from '@material-ui/core/Hidden';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import styles from './EmployeesLayout.styles';
import { withStyles } from '@material-ui/core/styles';
import withWidth from '@material-ui/core/withWidth';
import { getEmployeeByID, getEmployees }from '../../modules/axios/mysql';
import { createUser } from '../../modules/axios/graph';

class EmployeesLayout extends Component {
  state = {
    employees: [],
    query: '',
    searched: false,
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

  handleChange = (key) => (value) => this.setState({ [key]: value });
  getPreviousEmployees = () => {
    if (this.state.searched) {
      getEmployees(9999)
        .then(res => {
          this.setState({
            employees: res.data,
            searched: false
          });
        });
    }
    else {
      if (this.state.employees.length > 0 && this.state.employees[0].empNo > 10010) {
        const offset = this.state.employees[0].empNo - 10;
        getEmployees(offset)
          .then(res => {
            this.setState({
              employees: res.data
            });
          });
      }
    }
  }
  getNextEmployees = () => {
    if (this.state.searched) {
      getEmployees(9999)
        .then(res => {
          this.setState({
            employees: res.data,
            searched: false
          });
        });
    }
    else {
      if (this.state.employees.length > 0) {
        const offset = this.state.employees[0].empNo + 10;
        getEmployees(offset)
          .then(res => {
            this.setState({
              employees: res.data
            });
          });
      }
    }
  }
  fetchEmployeeByID = (empNo) => {
    getEmployeeByID(empNo)
      .then(res => {
        const employees = [];
        if (res.status == 200) {
          const employee = res.data;
          employee.department = employee.departments.join(', ');
          employees.push(employee);
        }
        this.setState({ employees, searched: true });
      });
  }

  componentDidMount() {
    getEmployees(9999)
      .then(res => {
        this.setState({
          employees: res.data
        });
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

    const searchBar = (
      <div className={classes.searchBar}>
        <TextField
          id="search"
          value={this.state.query}
          onChange={event => this.handleChange('query')(event.target.value)}
          variant="outlined"
          margin="normal"
          label="Employee ID"
          fullWidth
        />
        <IconButton
          className={classes.searchButton}
          onClick={() => this.fetchEmployeeByID(this.state.query)}
          variant="contained"
          color="secondary"
        > <SearchIcon/>
        </IconButton>
      </div>
    );

    console.log(this.state.employees);
    const tableBody = (
      <TableBody>
        {this.state.employees.map(employee => (
          <TableRow>
            <TableCell numeric>{employee.empNo}</TableCell>
            <Hidden xsDown>
              <TableCell>{`${employee.lastName}, ${employee.firstName}`}</TableCell>
              <TableCell>{`${employee.department}`}</TableCell>
            </Hidden>
            <TableCell>
              {employee.userPrincipleName
                ? employee.userPrincipleName
                : <Button onClick={() => createUser(employee.empNo)}>Add Account</Button>
              }
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    );
    const table = (
      <Paper className={classes.table}>
        <Table>
          <TableHead>
            <TableCell numeric>ID</TableCell>
            <Hidden xsDown>
              <TableCell>Name</TableCell>
              <TableCell>Department</TableCell>
            </Hidden>
            <TableCell>User Principle Name</TableCell>
          </TableHead>
          {tableBody}
        </Table>
      </Paper>
    );

    const controls = (
      <div className={classes.controls}>
        <Button
          onClick={this.getPreviousEmployees}
          variant="outlined"
        > Previous
        </Button>
        <Button
          onClick={this.getNextEmployees}
          variant="outlined"
        > Next
        </Button>
      </div>
    );

    return (
      <div className={classes.root}>
        <Typography
          variant={primaryVariant}
          gutterBottom
        > Employees
        </Typography>
        <Divider />
        {searchBar}
        {table}
        {controls}
      </div>
    )
  }
}

export default withWidth()(withStyles(styles, { withTheme: true })(EmployeesLayout));

