import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
// eslint-disable-next-line import/no-extraneous-dependencies
import { createLogger } from 'redux-logger';
import reducers from './reducer';

const logger = createLogger({
  collapsed: true,
  titleFormatter: action => `${action.meta && action.meta.prefix} ${action.type}`,
});

const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunk, logger)),
);
export default store;
