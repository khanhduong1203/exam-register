import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ROUTER from '../../constant/router';
import RoomsPage from './list';
import EditRoomPage from './edit';
import AddRoomPage from './add';

const Room = () => (
  <Switch>
    <Route path={ROUTER.SUBJECT.INDEX} component={RoomsPage} exact />
    <Route path={ROUTER.SUBJECT.ADD} component={AddRoomPage} exact />
    <Route path={ROUTER.SUBJECT.EDIT} component={EditRoomPage} exact />
  </Switch>
);

export default Room;
