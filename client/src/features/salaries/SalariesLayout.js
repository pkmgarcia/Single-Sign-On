import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import styles from './SalariesLayout.styles';
import { withStyles } from '@material-ui/core/styles';
import withWidth from '@material-ui/core/withWidth';
import { getSalaries }from '../../modules/axios/mysql';

class SalariesLayout extends Component {
  state = {
    salaries: []
  }

  handleChange = (key) => (value) => this.setState({ key: value });
  componentDidMount() {
    getSalaries(this.props.user.empNo)
      .then(res => {
        this.setState({ salaries: res.data });
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

    const tableBody = (
      <TableBody>
        {this.state.salaries.map(salary => (
          <TableRow>
            <TableCell numeric>{`$${salary.salary}`}</TableCell>
            <TableCell>{`${salary.from_date}`}</TableCell>
            <TableCell>{`${salary.to_date}`}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    );
    const table = (
      <Paper className={classes.table}>
        <Table>
          <TableHead>
            <TableCell numeric>Salary</TableCell>
            <TableCell>From Date</TableCell>
            <TableCell>To Date</TableCell>
          </TableHead>
          {tableBody}
        </Table>
      </Paper>
    );
    return (
      <div className={classes.root}>
        <Typography
          variant={primaryVariant}
          gutterBottom
        > Payroll 
        </Typography>
        <Divider />
        {table}
      </div>
    )
  }
}

export default withWidth()(withStyles(styles, { withTheme: true })(SalariesLayout));

