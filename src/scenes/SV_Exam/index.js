import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ROUTER from '../../constant/router';
import ExamRegistrationPage from './list';

const ExamRegistration = () => (
  <Switch>
    <Route path={ROUTER.EXAM_REGISTRATION.INDEX} component={ExamRegistrationPage} exact />
  </Switch>
);

export default ExamRegistration;
