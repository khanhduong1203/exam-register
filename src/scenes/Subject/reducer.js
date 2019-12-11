import { fromJS } from 'immutable';
import { TYPE } from '../../config/actions';

const initialState = fromJS({
  list: [],
  detail: {},
  isFetching: false,
  didInvalidate: true,
});

const subjectReducer = (state = initialState, action) => {
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
    case TYPE.UPDATE_SUBJECT_SUCCESS:
      return state.merge({
        detail: { ...state.detail, ...action.payload },
        isFetching: false,
      });
    case TYPE.INSERT_SUBJECT_SUCCESS:
    case TYPE.INSERT_SUBJECT_FAILURE:
    case TYPE.GET_SUBJECT_FAILURE:
    case TYPE.GET_SUBJECTS_FAILURE:
    case TYPE.UPDATE_SUBJECT_FAILURE:
      return state.merge({
        isFetching: false,
        didInvalidate: false,
      });
    default:
      return state;
  }
};
export default subjectReducer;
