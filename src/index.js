import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';

import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AppLayout from './scenes/AppLayout';
import LoginPage from './scenes/Auth/LoginPage';
import ROUTER from './constant/router';
import store from './redux/store';
import LocaleContext from './utils/locale';

const App = () => (
  <Provider store={store}>
    <LocaleContext.Provider>
      <Router>
        <Switch>
          <Route exact path={ROUTER.AUTH.LOGIN} component={LoginPage} />
          <Route path={ROUTER.HOME} component={AppLayout} />
        </Switch>
      </Router>
    </LocaleContext.Provider>
  </Provider>
);
ReactDOM.render(
  <App />,
  document.getElementById('root'),
);
