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
      payload: response.data.data,
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
