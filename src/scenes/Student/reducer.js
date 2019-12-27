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
  let arr = [];
  let index = -1;
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
      arr = state.get('list');
      arr = [...arr];
      index = arr.findIndex(e => e.student_id === action.id);
      arr[index] = { ...arr[index], ...action.payload };
      return state.merge({
        list: arr,
        detail: { ...state.detail, ...action.payload },
        isFetching: false,
      });
    case TYPE.INSERT_STUDENT_SUCCESS:
      return state.merge({
        isFetching: false,
      });
    case TYPE.DELETE_STUDENT_SUCCESS:
      arr = state.get('list');
      arr = [...arr];
      index = arr.findIndex(e => e.student_code === action.id);
      arr.splice(index, 1);
      return state.merge({
        list: arr,
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
