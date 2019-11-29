import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ROUTER from '../../constant/router';
import StudentInfoPage from './list';

const StudentInfo = () => (
  <Switch>
    <Route path={ROUTER.STUDENT_INFO.INDEX} component={StudentInfoPage} exact />
  </Switch>
);

export default StudentInfo;
