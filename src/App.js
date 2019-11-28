import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AppLayout from './scenes/AppLayout';
import LoginPage from './scenes/Auth/LoginPage';
import ROUTER from './constant/router';

window.jQuery = require('jquery');

const App = () => (
  <div>
    <Switch>
      <Route exact path={ROUTER.AUTH.LOGIN} component={LoginPage} />
      <Route path={ROUTER.HOME} component={AppLayout} />
    </Switch>
  </div>
);

// eslint-disable-next-line
export default process.env.NODE_ENV === 'development' ? require('react-hot-loader/root').hot(App) : App;
