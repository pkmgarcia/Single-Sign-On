import React, { Component } from 'react';
import { employeeCRUD } from '../../modules/axios';

class DashboardLayout extends Component {
  state = {
    employee: null
  }

  componentDidMount() {
    employeeCRUD.getEmployee('10001')
      .then((response) => {
        const employee = response.data;
        this.setState({ employee });
      });
  }

  render() {
    return (
      <div>{this.state.employee}</div>
    )
  }
}

export default DashboardLayout;

