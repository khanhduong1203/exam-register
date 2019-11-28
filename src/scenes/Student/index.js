import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ROUTER from '../../constant/router';
import EmployeesPage from './list';
import AddEmployeePage from './add';
import EditEmployeePage from './edit';

const Employee = () => (
  <Switch>
    <Route path={ROUTER.STUDENT.INDEX} component={EmployeesPage} exact />
    <Route path={ROUTER.STUDENT.ADD} component={AddEmployeePage} exact />
    <Route path={ROUTER.STUDENT.EDIT} component={EditEmployeePage} exact />
  </Switch>
);

export default Employee;
