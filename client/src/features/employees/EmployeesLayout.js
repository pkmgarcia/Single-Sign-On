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

class EmployeesLayout extends Component {
  state = {
    employees: [],
    paginationOffset: 0,
    query: ''
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

  handleChange = (key) => (value) => this.setState({ key: value });
  getPreviousEmployees = () => {
    if (this.state.paginationOffset > 4) {
      const newPaginationOffset = this.state.paginationOffset - 10;
      getEmployees(this.state.paginationOffset)
        .then(res => {
          this.setState({ employees: res });
          this.setState({ paginationOffset: newPaginationOffset });
        });
    }
  }
  getNextEmployees = () => {
    const newPaginationOffset = this.state.paginationOffset + 10;
    getEmployees(this.state.paginationOffset)
      .then(res => {
        this.setState({ employees: res });
        this.setState({ paginationOffset: newPaginationOffset });
      });
  }
  fetchEmployeeByID = (empNo) => {
    getEmployeeByID(empNo)
      .then(res => {
        const employees = [];
        employees.push(res);
        this.setState({ employees });
      });
  }

  componentDidMount() {
    getEmployees(0)
      .then(res => {
        this.setState({ employees: res });
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
          onChange={(event) => this.handleChange('query')(event.target.value)}
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

    /*
    const employees = this.state.employees.length > 0
      ? this.state.employees
      : this.default.employees;
    */

    const tableBody = (
      <TableBody>
        {this.state.employees.map(employee => (
           <TableRow key={employee.empNo}>
             <TableCell>{employee.empNo}</TableCell>
             <Hidden xsDown>
               <TableCell>{`${employee.lastName}, ${employee.firstName}`}</TableCell>
               <TableCell>{employee.department}</TableCell>
             </Hidden>
             {employee.userPrincipalName
               ? (<TableCell>{employee.userPrincipalName}</TableCell>)
               : (<TableCell><Button>Add Account?</Button></TableCell>)
             }
           </TableRow>
        ))}
      </TableBody>
    );
    const table = (
      <Paper className={classes.table}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell numeric>ID</TableCell>
              <Hidden xsDown>
                <TableCell>Name</TableCell>
                <TableCell>Department</TableCell>
              </Hidden>
              <TableCell>MS Account</TableCell>
            </TableRow>
          </TableHead>
          {tableBody}
        </Table>
      </Paper>
    );

    const controls = (
      <div className={classes.controls}>
        <Button
          onClick={() => ''}
          variant="outlined"
        > Previous
        </Button>
        <Button
          onClick={() => ''}
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

