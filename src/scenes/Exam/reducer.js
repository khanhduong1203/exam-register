import { fromJS } from 'immutable';
import { TYPE } from '../../config/actions';
import { EXAMS } from '../../constant/enum';
// import { combineReducers } from 'redux-immutable';

const departmentState = fromJS({
  list: EXAMS,
  detail: {},
  isFetching: false,
  didInvalidate: true,
});

const department = (state = departmentState, action) => {
  switch (action.type) {
    case TYPE.GETTING_DEPARTMENTS:
    case TYPE.SELECTING_DEPARTMENT:
      return state.merge({
        isFetching: true,
      });
    case TYPE.GET_DEPARTMENTS_SUCCESS:
      return state.merge({
        list: action.payload,
        didInvalidate: false,
        isFetching: false,
      });
    case TYPE.GET_DEPARTMENTS_FAILURE:
      return departmentState;
    case TYPE.SELECT_DEPARTMENT_SUCCESS:
      return state.merge({
        detail: action.payload,
        isFetching: false,
      });
    case TYPE.SELECT_DEPARTMENT_FAILURE:
      return state.merge({
        isFetching: false,
      });
    default:
      return state;
  }
};


export default department;
