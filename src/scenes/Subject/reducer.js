import { fromJS } from 'immutable';
import { TYPE } from '../../config/actions';

const initialState = fromJS({
  list: [],
  detail: {},
  isFetching: false,
  didInvalidate: true,
});

const subjectReducer = (state = initialState, action) => {
  let arr = [];
  let index = -1;
  switch (action.type) {
    case TYPE.GETTING_SUBJECT:
    case TYPE.GETTING_SUBJECTS:
    case TYPE.INSERTING_SUBJECT:
    case TYPE.UPDATING_SUBJECT:
    case TYPE.DELETING_SUBJECT:
      return state.merge({
        isFetching: true,
      });
    case TYPE.GET_SUBJECTS_SUCCESS:
      return state.merge({
        list: action.payload,
        isFetching: false,
        didInvalidate: false,
      });
    case TYPE.GET_SUBJECT_SUCCESS:
      return state.merge({
        detail: action.payload,
        isFetching: false,
      });
    case TYPE.INSERT_SUBJECT_SUCCESS:
      arr = state.get('list');
      arr = [...arr];
      arr.push(action.newSubject);
      return state.merge({
        list: arr,
        isFetching: false,
      });
    case TYPE.UPDATE_SUBJECT_SUCCESS:
      arr = state.get('list');
      arr = [...arr];
      index = arr.findIndex(e => e.subject_id === action.id);
      arr[index] = { ...arr[index], ...action.payload };
      return state.merge({
        list: arr,
        detail: { ...state.detail, ...action.payload },
        isFetching: false,
      });
    case TYPE.DELETE_SUBJECT_SUCCESS:
      arr = state.get('list');
      arr = [...arr];
      index = arr.findIndex(e => e.subject_id === action.id);
      arr.splice(index, 1);
      return state.merge({
        list: arr,
        isFetching: false,
      });
    case TYPE.INSERT_SUBJECT_FAILURE:
    case TYPE.GET_SUBJECT_FAILURE:
    case TYPE.GET_SUBJECTS_FAILURE:
    case TYPE.UPDATE_SUBJECT_FAILURE:
    case TYPE.DELETE_SUBJECT_FAILURE:
      return state.merge({
        isFetching: false,
        didInvalidate: false,
      });
    default:
      return state;
  }
};
export default subjectReducer;
