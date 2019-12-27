import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ROUTER from '../../constant/router';
import SubjectsPage from './list';
import EditSubjectPage from './edit';
import AddSubjectPage from './add';

const Subject = history => (
  <Switch>
    <Route path={ROUTER.SUBJECT.INDEX} component={SubjectsPage} exact history={history} />
    <Route path={ROUTER.SUBJECT.ADD} component={AddSubjectPage} exact history={history} />
    <Route path={ROUTER.SUBJECT.EDIT} component={EditSubjectPage} exact history={history} />
  </Switch>
);

export default Subject;
