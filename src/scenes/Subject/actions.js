import { TYPE, PREFIX } from '../../config/actions';
import { API_URLS } from '../../config/api';
import { apiCall } from '../../utils/api';
import select from '../../utils/select';

export const getSubjects = params => async (dispatch) => {
  const api = API_URLS.SUBJECT.getSubjects();
  dispatch({
    type: TYPE.GETTING_SUBJECTS,
  });
  const { response, error } = await apiCall({ ...api, params });
  if (!error && response.status === 200) {
    dispatch({
      type: TYPE.GET_SUBJECTS_SUCCESS,
      payload: response.data !== null ? response.data : [],
    });
  } else {
    dispatch({
      type: TYPE.GET_SUBJECTS_FAILURE,
    });
  }
};

export const getSubject = id => async (dispatch) => {
  const api = API_URLS.SUBJECT.getSubject(id);
  dispatch({
    type: TYPE.GETTING_SUBJECT,
  });
  const { response, error } = await apiCall(api);
  if (!error && response.status === 200 && response.data.success === undefined) {
    dispatch({
      type: TYPE.GET_SUBJECT_SUCCESS,
      payload: response.data,
    });
  } else {
    dispatch({
      type: TYPE.GET_SUBJECT_FAILURE,
    });
  }
};

export const getSubjectsIfNeed = params => async (dispatch, getState) => {
  const state = getState();
  const isFetching = select(state, 'subjectReducer', 'isFetching');
  const didInvalidate = select(state, 'subjectReducer', 'didInvalidate');
  if (!isFetching && didInvalidate) {
    dispatch(getSubjects(params));
  }
};

export const insertSubject = (payload, meta) => async (dispatch) => {
  const api = API_URLS.SUBJECT.insertSubject();
  dispatch({
    type: TYPE.INSERTING_SUBJECT,
  });
  const { response, error } = await apiCall({ ...api, payload });
  if (!error && response.status === 200 && response.data.success === undefined) {
    if (meta && meta.onSuccess) {
      meta.onSuccess();
    }
    dispatch({
      type: TYPE.INSERT_SUBJECT_SUCCESS,
      payload,
    });
  } else {
    if (meta && meta.onError) {
      meta.onError();
    }
    dispatch({
      type: TYPE.INSERT_SUBJECT_FAILURE,
    });
  }
};

export const updateSubject = (id, payload, meta) => async (dispatch) => {
  const api = API_URLS.SUBJECT.updateSubject(id);
  dispatch({
    type: TYPE.UPDATING_SUBJECT,
  });
  const { response, error } = await apiCall({ ...api, payload });
  if (!error && response.status === 200 && response.data.success === undefined) {
    if (meta && meta.onSuccess) {
      meta.onSuccess();
    }
    dispatch({
      type: TYPE.UPDATE_SUBJECT_SUCCESS,
      payload,
    });
  } else {
    if (meta && meta.onError) {
      meta.onError();
    }
    dispatch({
      type: TYPE.UPDATE_SUBJECT_FAILURE,
    });
  }
};
