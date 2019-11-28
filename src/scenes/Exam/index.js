import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ROUTER from '../../constant/router';
import ExamPage from './add';

const Employee = () => (
  <Switch>
    <Route path={ROUTER.EXAM.INDEX} component={ExamPage} exact />
  </Switch>
);

export default Employee;
