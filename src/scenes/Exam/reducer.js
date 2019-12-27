/* eslint-disable no-case-declarations */
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
  let detail = null;
  let arr = [];
  let index = -1;
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
    case TYPE.INSERT_EXAM_SHIFT_SUCCESS:
      detail = state.get('detail');
      arr = [...detail.exam_shift];
      arr.push(action.newShift);
      return state.merge({
        detail: {
          ...detail,
          exam_shift: arr,
        },
      });
    case TYPE.UPDATE_EXAM_SHIFT_SUCCESS:
      detail = state.get('detail');
      arr = [...detail.exam_shift];
      index = arr.findIndex(e => e.exam_shift_id === action.id);
      arr[index] = action.payload;
      return state.merge({
        detail: {
          ...detail,
          exam_shift: arr,
        },
      });
    case TYPE.DELETE_EXAM_SHIFT_SUCCESS:
      detail = state.get('detail');
      arr = [...detail.exam_shift];
      index = arr.findIndex(e => e.exam_shift_id === action.id);
      arr.splice(index, 1);
      return state.merge({
        detail: {
          ...detail,
          exam_shift: arr,
        },
      });
    case TYPE.INSERT_EXAM_ROOM_SUCCESS:
      detail = state.get('detail');
      arr = [...detail.exam_room];
      arr.push(action.newRoom);
      return state.merge({
        detail: {
          ...detail,
          exam_room: arr,
        },
      });
    case TYPE.UPDATE_EXAM_ROOM_SUCCESS:
      detail = state.get('detail');
      arr = [...detail.exam_room];
      index = arr.findIndex(e => e.exam_room_id === action.id);
      arr[index] = action.payload;
      return state.merge({
        detail: {
          ...detail,
          exam_room: arr,
        },
      });
    case TYPE.DELETE_EXAM_ROOM_SUCCESS:
      detail = state.get('detail');
      arr = [...detail.exam_room];
      index = arr.findIndex(e => e.exam_room_id === action.id);
      arr.splice(index, 1);
      return state.merge({
        detail: {
          ...detail,
          exam_room: arr,
        },
      });
    default:
      return state;
  }
};


export default EXAM;
