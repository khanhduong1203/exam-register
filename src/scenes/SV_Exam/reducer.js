/* eslint-disable prefer-const */
/* eslint-disable no-case-declarations */
import { fromJS, Map, List } from 'immutable';
import { TYPE } from '../../config/actions';
import { EXAM_SUBJECTS, SHIFTS } from '../../constant/enum';

const initialState = fromJS({
  list: [],
  detail: {
    subjects: EXAM_SUBJECTS,
    shifts: SHIFTS,
    name: 'Học kì II - năm 2019',
  },
  schedule: [],
  exam: {},
  isFetching: false,
  didInvalidate: true,
});

const examRegistrationReducer = (state = initialState, action) => {
  switch (action.type) {
    case TYPE.GETTING_EXAM:
    case TYPE.GETTING_EXAMS:
    case TYPE.INSERTING_EXAM:
    case TYPE.UPDATING_EXAM:
    case TYPE.DELETING_EXAM:
      return state.merge({
        isFetching: true,
      });
    case TYPE.GET_EXAMS_SUCCESS:
      return state.merge({
        list: action.payload,
        isFetching: false,
        didInvalidate: false,
      });
    case TYPE.GET_EXAM_SUCCESS:
      return state.merge({
        detail: action.payload,
        isFetching: false,
      });
    case TYPE.UPDATE_EXAM_SUCCESS:
      const { payload } = action;
      return state.merge({
        detail: { ...state.detail, ...payload },
        isFetching: false,
      });
    case TYPE.INSERT_EXAM_SUCCESS:
      return state.merge({
        isFetching: false,
      });
    case TYPE.GET_SCHEDULE_FOR_STUDENT_SUCCESS:
      return state.merge({
        schedule: action.payload[0].schedule,
        exam: action.payload[0].exam[0],
      });
    case TYPE.INSERT_EXAM_FAILURE:
    case TYPE.GET_EXAM_FAILURE:
    case TYPE.GET_EXAMS_FAILURE:
    case TYPE.UPDATE_EXAM_FAILURE:
      return state.merge({
        isFetching: false,
        didInvalidate: false,
      });
    default:
      return state;
  }
};
export default examRegistrationReducer;
