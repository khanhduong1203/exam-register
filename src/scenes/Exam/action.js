import { TYPE, PREFIX } from '../../config/actions';
import { apiCall } from '../../utils/api';
import { API_URLS } from '../../config/api';

export const getDepartment = id => async (dispatch) => {
  dispatch({ type: TYPE.SELECTING_DEPARTMENT });
  const api = API_URLS.EXAM.getDepartment(id);
  const { response, error } = await apiCall(api);
  if (!error && response.status === 200 && response.data.success === true) {
    dispatch({
      type: TYPE.SELECT_DEPARTMENT_SUCCESS,
      payload: response.data.data,
      meta: { prefix: [PREFIX.ROOM, PREFIX.API_CALLED_SUCCESS] },
    });
  } else {
    dispatch({
      type: TYPE.SELECT_DEPARTMENT_FAILURE,
      meta: { prefix: [PREFIX.ROOM, PREFIX.API_CALLED_FAILURE] },
    });
  }
};

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
