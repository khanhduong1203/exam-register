import { TYPE, PREFIX } from '../../config/actions';
import { API_URLS } from '../../config/api';
import { apiCall } from '../../utils/api';
import select from '../../utils/select';

export const getStudents = params => async (dispatch) => {
  const api = API_URLS.STUDENT.getStudents();
  dispatch({
    type: TYPE.GETTING_STUDENTS,
  });
  const { response, error } = await apiCall({ ...api, params });
  if (!error && response.status === 200 && response.data.success === true) {
    dispatch({
      type: TYPE.GET_STUDENTS_SUCCESS,
      payload: response.data.data,
    });
  } else {
    dispatch({
      type: TYPE.GET_STUDENTS_FAILURE,
    });
  }
};

export const getStudentsIfNeed = params => (dispatch, getState) => {
  const state = getState();
  const isFetching = select(state, 'studentReducer', 'isFetching');
  const didInvalidate = select(state, 'studentReducer', 'didInvalidate');
  if (!isFetching && didInvalidate) {
    dispatch(getStudents(params));
  }
};

export const getStudent = id => async (dispatch) => {
  const api = API_URLS.STUDENT.getStudent(id);
  dispatch({
    type: TYPE.GETTING_STUDENT,
    meta: { prefix: [PREFIX.STUDENT, PREFIX.API_CALLING] },
  });
  const { response, error } = await apiCall(api);
  if (!error && response.status === 200 && response.data.success === true) {
    dispatch({
      type: TYPE.GET_STUDENT_SUCCESS,
      payload: response.data.data,
    });
  } else {
    dispatch({
      type: TYPE.GET_STUDENT_FAILURE,
    });
  }
};

export const insertStudent = (payload, meta) => async (dispatch) => {
  const api = API_URLS.STUDENT.insertStudent();
  dispatch({
    type: TYPE.INSERTING_STUDENT,
  });
  const { response, error } = await apiCall({ ...api, payload });
  if (!error && response.status === 200 && response.data.success === true) {
    if (meta && meta.onSuccess) {
      meta.onSuccess();
    }
    dispatch({
      type: TYPE.INSERT_STUDENT_SUCCESS,
      payload,
    });
  } else {
    if (meta && meta.onError) {
      meta.onError();
    }
    dispatch({
      type: TYPE.INSERT_STUDENT_FAILURE,
    });
  }
};

export const updateStudent = (id, payload, meta) => async (dispatch) => {
  const api = API_URLS.STUDENT.updateStudent(id);
  dispatch({
    type: TYPE.UPDATING_STUDENT,
  });
  const { response, error } = await apiCall({ ...api, payload });
  console.log(response);
  if (!error && response.status === 200 && response.data.success === true) {
    if (meta && meta.onSuccess) {
      meta.onSuccess();
    }
    dispatch({
      type: TYPE.UPDATE_STUDENT_SUCCESS,
      payload,
    });
  } else {
    if (meta && meta.onError) {
      meta.onError();
    }
    dispatch({
      type: TYPE.UPDATE_STUDENT_FAILURE,
    });
  }
};

export const changeEmpAbility = (id, roomId, ability) => async (dispatch) => {
  dispatch({
    type: TYPE.CHANGE_STUDENT_ABILITY, id, roomId, ability,
  });
};
