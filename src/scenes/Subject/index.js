import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ROUTER from '../../constant/router';
import SubjectsPage from './list';

const Subject = history => (
  <Switch>
    <Route path={ROUTER.SUBJECT.INDEX} component={SubjectsPage} exact history={history} />
  </Switch>
);

export default Subject;
