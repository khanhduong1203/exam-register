import { combineReducers } from 'redux-immutable';
import appReducer from '../scenes/AppLayout/reducer';
import authReducer from '../scenes/Auth/reducer';
import studentReducer from '../scenes/Student/reducer';
import subjectReducer from '../scenes/Subject/reducer';
import examReducer from '../scenes/Exam/reducer';

export default combineReducers({
  authReducer,
  appReducer,
  studentReducer,
  subjectReducer,
  examReducer,
});
