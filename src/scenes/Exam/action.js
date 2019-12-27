import { TYPE, PREFIX } from '../../config/actions';
import { apiCall } from '../../utils/api';
import { API_URLS } from '../../config/api';
import select from '../../utils/select';

export const getExams = () => async (dispatch) => {
  dispatch({ type: TYPE.GETTING_EXAMS });
  const api = API_URLS.EXAM.getExams();
  const { response, error } = await apiCall(api);
  if (!error && response.status === 200 && response.data.success === true) {
    dispatch({
      type: TYPE.GET_EXAMS_SUCCESS,
      payload: response.data.data,
      meta: { prefix: [PREFIX.ROOM, PREFIX.API_CALLED_SUCCESS] },
    });
  } else {
    dispatch({
      type: TYPE.GET_EXAMS_FAILURE,
      meta: { prefix: [PREFIX.ROOM, PREFIX.API_CALLED_FAILURE] },
    });
  }
};

export const getExamsIfNeed = params => async (dispatch, getState) => {
  const state = getState();
  const isFetching = select(state, 'examReducer', 'isFetching');
  const didInvalidate = select(state, 'examReducer', 'didInvalidate');
  if (!isFetching && didInvalidate) {
    dispatch(getExams(params));
  }
};

export const createExam = (payload, meta) => async (dispatch) => {
  dispatch({ type: TYPE.INSERTING_EXAM });
  const api = API_URLS.EXAM.createExam();
  const { response, error } = await apiCall({ ...api, payload });
  if (!error && response.status === 200 && response.data.success === true) {
    dispatch({
      type: TYPE.INSERT_EXAM_SUCCESS,
      payload,
      meta: { prefix: [PREFIX.EXAM, PREFIX.API_CALLED_SUCCESS] },
    });
    if (meta && meta.onSuccess) {
      meta.onSuccess();
    }
  } else {
    dispatch({
      type: TYPE.INSERT_EXAM_FAILURE,
      meta: { prefix: [PREFIX.EXAM, PREFIX.API_CALLED_FAILURE] },
    });
    if (meta && meta.onError) {
      meta.onError();
    }
  }
};

export const getExam = (id, meta) => async (dispatch) => {
  dispatch({ type: TYPE.SELECTING_EXAM });
  const api = API_URLS.EXAM.getExam(id);
  const { response, error } = await apiCall(api);
  if (!error && response.status === 200 && response.data.success === true) {
    dispatch({
      type: TYPE.SELECT_EXAM_SUCCESS,
      payload: response.data.data[0],
      meta: { prefix: [PREFIX.EXAM, PREFIX.API_CALLED_SUCCESS] },
    });
    if (meta && meta.onSuccess) {
      meta.onSuccess();
    }
  } else {
    dispatch({
      type: TYPE.SELECT_EXAM_FAILURE,
      meta: { prefix: [PREFIX.EXAM, PREFIX.API_CALLED_FAILURE] },
    });
    if (meta && meta.onError) {
      meta.onError();
    }
  }
};

/** EXAM_SHIFT */
export const createExamShift = (payload, meta) => async (dispatch) => {
  dispatch({ type: TYPE.INSERTING_EXAM_SHIFT });
  const api = API_URLS.EXAM_SHIFT.createExamShift();
  const { response, error } = await apiCall({ ...api, payload });
  if (!error && response.status === 200 && response.data.success === true) {
    dispatch({
      type: TYPE.INSERT_EXAM_SHIFT_SUCCESS,
      newShift: {
        ...payload,
        exam_shift_id: response.data.data.exam_shift_id,
      },
      meta: { prefix: [PREFIX.EXAM, PREFIX.API_CALLED_SUCCESS] },
    });
    if (meta && meta.onSuccess) {
      meta.onSuccess();
    }
  } else {
    dispatch({
      type: TYPE.INSERT_EXAM_SHIFT_FAILURE,
      meta: { prefix: [PREFIX.EXAM, PREFIX.API_CALLED_FAILURE] },
    });
    if (meta && meta.onError) {
      meta.onError();
    }
  }
};

export const updateExamShift = (id, payload, meta) => async (dispatch) => {
  dispatch({ type: TYPE.UPDATING_EXAM_SHIFT });
  const api = API_URLS.EXAM_SHIFT.updateExamShift(id);
  const { response, error } = await apiCall({ ...api, payload });
  if (!error && response.status === 200 && response.data.success === true) {
    dispatch({
      type: TYPE.UPDATE_EXAM_SHIFT_SUCCESS,
      id,
      payload,
      meta: { prefix: [PREFIX.EXAM, PREFIX.API_CALLED_SUCCESS] },
    });
    if (meta && meta.onSuccess) {
      meta.onSuccess();
    }
  } else {
    dispatch({
      type: TYPE.UPDATE_EXAM_SHIFT_FAILURE,
      meta: { prefix: [PREFIX.EXAM, PREFIX.API_CALLED_FAILURE] },
    });
    if (meta && meta.onError) {
      meta.onError();
    }
  }
};

export const deleteExamShift = (id, meta) => async (dispatch) => {
  dispatch({ type: TYPE.DELETING_EXAM_SHIFT });
  const api = API_URLS.EXAM_SHIFT.deleteExamShift(id);
  const { response, error } = await apiCall(api);
  if (!error && response.status === 200 && response.data.success === true) {
    dispatch({
      type: TYPE.DELETE_EXAM_SHIFT_SUCCESS,
      id,
      meta: { prefix: [PREFIX.EXAM, PREFIX.API_CALLED_SUCCESS] },
    });
    if (meta && meta.onSuccess) {
      meta.onSuccess();
    }
  } else {
    dispatch({
      type: TYPE.DELETE_EXAM_SHIFT_FAILURE,
      meta: { prefix: [PREFIX.EXAM, PREFIX.API_CALLED_FAILURE] },
    });
    if (meta && meta.onError) {
      meta.onError();
    }
  }
};

/** EXAM_ROOM */
export const createExamRoom = (payload, meta) => async (dispatch) => {
  dispatch({ type: TYPE.INSERTING_EXAM_ROOM });
  const api = API_URLS.EXAM_ROOM.createExamRoom();
  const { response, error } = await apiCall({ ...api, payload });
  if (!error && response.status === 200 && response.data.success === true) {
    dispatch({
      type: TYPE.INSERT_EXAM_ROOM_SUCCESS,
      newRoom: {
        ...payload,
        exam_room_id: response.data.data.exam_room_id,
      },
      meta: { prefix: [PREFIX.EXAM, PREFIX.API_CALLED_SUCCESS] },
    });
    if (meta && meta.onSuccess) {
      meta.onSuccess();
    }
  } else {
    dispatch({
      type: TYPE.INSERT_EXAM_ROOM_FAILURE,
      meta: { prefix: [PREFIX.EXAM, PREFIX.API_CALLED_FAILURE] },
    });
    if (meta && meta.onError) {
      meta.onError();
    }
  }
};

export const updateExamRoom = (id, payload, meta) => async (dispatch) => {
  dispatch({ type: TYPE.UPDATING_EXAM_ROOM });
  const api = API_URLS.EXAM_ROOM.updateExamRoom(id);
  const { response, error } = await apiCall({ ...api, payload });
  if (!error && response.status === 200 && response.data.success === true) {
    dispatch({
      type: TYPE.UPDATE_EXAM_ROOM_SUCCESS,
      id,
      payload,
      meta: { prefix: [PREFIX.EXAM, PREFIX.API_CALLED_SUCCESS] },
    });
    if (meta && meta.onSuccess) {
      meta.onSuccess();
    }
  } else {
    dispatch({
      type: TYPE.UPDATE_EXAM_ROOM_FAILURE,
      meta: { prefix: [PREFIX.EXAM, PREFIX.API_CALLED_FAILURE] },
    });
    if (meta && meta.onError) {
      meta.onError();
    }
  }
};

export const deleteExamRoom = (id, meta) => async (dispatch) => {
  dispatch({ type: TYPE.DELETING_EXAM_ROOM });
  const api = API_URLS.EXAM_ROOM.deleteExamRoom(id);
  const { response, error } = await apiCall(api);
  if (!error && response.status === 200 && response.data.success === true) {
    dispatch({
      type: TYPE.DELETE_EXAM_ROOM_SUCCESS,
      id,
      meta: { prefix: [PREFIX.EXAM, PREFIX.API_CALLED_SUCCESS] },
    });
    if (meta && meta.onSuccess) {
      meta.onSuccess();
    }
  } else {
    dispatch({
      type: TYPE.DELETE_EXAM_ROOM_FAILURE,
      meta: { prefix: [PREFIX.EXAM, PREFIX.API_CALLED_FAILURE] },
    });
    if (meta && meta.onError) {
      meta.onError();
    }
  }
};
