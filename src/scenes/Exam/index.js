import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ROUTER from '../../constant/router';
import ExamPage from './add';
import ListExamPage from './list';

const Exam = history => (
  <Switch>
    <Route path={ROUTER.EXAM.INDEX} component={ListExamPage} history={history} exact />
    <Route path={ROUTER.EXAM.ADD} component={ExamPage} history={history} exact />
  </Switch>
);

export default Exam;
