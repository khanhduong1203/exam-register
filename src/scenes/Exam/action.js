import { TYPE, PREFIX } from '../../config/actions';
import { apiCall } from '../../utils/api';
import { API_URLS } from '../../config/api';

export const getDepartment = id => async (dispatch) => {
  dispatch({ type: TYPE.SELECTING_DEPARTMENT });
  const api = API_URLS.DEPARTMENT.getDepartment(id);
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

export const getDepartments = () => async (dispatch) => {
  dispatch({ type: TYPE.GETTING_DEPARTMENTS });
  const api = API_URLS.DEPARTMENT.getDepartments();
  const { response, error } = await apiCall(api);
  if (!error && response.status === 200 && response.data.success === true) {
    dispatch({
      type: TYPE.GET_DEPARTMENTS_SUCCESS,
      payload: response.data.data,
      meta: { prefix: [PREFIX.ROOM, PREFIX.API_CALLED_SUCCESS] },
    });
    if (response.data.data.length > 0) {
      dispatch(getDepartment(response.data.data[0].id));
    }
  } else {
    dispatch({
      type: TYPE.GET_DEPARTMENTS_FAILURE,
      meta: { prefix: [PREFIX.ROOM, PREFIX.API_CALLED_FAILURE] },
    });
  }
};
