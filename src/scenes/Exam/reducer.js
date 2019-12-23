import { fromJS } from 'immutable';
import { TYPE } from '../../config/actions';
// import { combineReducers } from 'redux-immutable';

const EXAMState = fromJS({
  list: [],
  detail: {},
  isFetching: false,
  didInvalidate: true,
});

const EXAM = (state = EXAMState, action) => {
  switch (action.type) {
    case TYPE.GETTING_EXAMS:
    case TYPE.UPDATING_EXAM:
    case TYPE.INSERTING_EXAM:
    case TYPE.DELETING_EXAM:
    case TYPE.SELECTING_EXAM:
      return state.merge({
        isFetching: true,
      });
    case TYPE.GET_EXAMS_SUCCESS:
      return state.merge({
        list: action.payload,
        didInvalidate: false,
        isFetching: false,
      });
    case TYPE.GET_EXAMS_FAILURE:
      return EXAMState;
    case TYPE.SELECT_EXAM_SUCCESS:
      return state.merge({
        detail: action.payload,
        isFetching: false,
      });
    case TYPE.SELECT_EXAM_FAILURE:
      return state.merge({
        isFetching: false,
        didInvalidate: false,
      });
    default:
      return state;
  }
};


export default EXAM;
