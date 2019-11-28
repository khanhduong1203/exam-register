/* eslint-disable prefer-const */
/* eslint-disable no-case-declarations */
import { fromJS, Map, List } from 'immutable';
import { TYPE } from '../../config/actions';

const initialState = fromJS({
  list: [],
  detail: {},
  isFetching: false,
  didInvalidate: true,
});

const studentReducer = (state = initialState, action) => {
  switch (action.type) {
    case TYPE.GETTING_STUDENT:
    case TYPE.GETTING_STUDENTS:
    case TYPE.INSERTING_STUDENT:
    case TYPE.UPDATING_STUDENT:
    case TYPE.DELETING_STUDENT:
      return state.merge({
        isFetching: true,
      });
    case TYPE.GET_STUDENTS_SUCCESS:
      return state.merge({
        list: action.payload,
        isFetching: false,
        didInvalidate: false,
      });
    case TYPE.GET_STUDENT_SUCCESS:
      return state.merge({
        detail: action.payload,
        isFetching: false,
      });
    case TYPE.UPDATE_STUDENT_SUCCESS:
      const { payload } = action;
      return state.merge({
        detail: { ...state.detail, ...payload },
        isFetching: false,
      });
    case TYPE.INSERT_STUDENT_SUCCESS:
      return state.merge({
        isFetching: false,
      });
    case TYPE.INSERT_STUDENT_FAILURE:
    case TYPE.GET_STUDENT_FAILURE:
    case TYPE.GET_STUDENTS_FAILURE:
    case TYPE.UPDATE_STUDENT_FAILURE:
      return state.merge({
        isFetching: false,
        didInvalidate: false,
      });
    default:
      return state;
  }
};
export default studentReducer;
