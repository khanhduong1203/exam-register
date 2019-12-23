import { API_URLS } from '../../config/api';
import { apiCall } from '../../utils/api';
import { TYPE, PREFIX } from '../../config/actions';
import select from '../../utils/select';
import { getExams } from '../Exam/action';

const loggingIn = {
  type: TYPE.LOG_IN,
  meta: { prefix: [PREFIX.AUTH, PREFIX.API_CALLING] },
};

export const loggingInWithToken = {
  type: TYPE.LOG_IN_TOKEN,
  meta: { prefix: [PREFIX.AUTH, PREFIX.API_CALLING] },
};

const logInSuccessWithToken = (payload, location) => ({
  type: TYPE.LOG_IN_TOKEN,
  payload,
  meta: { prefix: [PREFIX.AUTH, PREFIX.API_CALLED_SUCCESS] },
});

const logInFailureWithToken = payload => ({
  type: TYPE.LOG_IN_TOKEN,
  payload,
  meta: { prefix: [PREFIX.AUTH, PREFIX.API_CALLED_FAILURE] },
});

const logInSuccess = (payload, remember) => ({
  type: TYPE.LOG_IN,
  payload,
  meta: { prefix: [PREFIX.AUTH, PREFIX.API_CALLED_SUCCESS], remember },
});

const logInFailure = payload => ({
  type: TYPE.LOG_IN,
  payload,
  meta: { prefix: [PREFIX.AUTH, PREFIX.API_CALLED_FAILURE] },
});

const changingPassword = () => ({
  type: TYPE.CHANGE_PASSWORD,
  meta: { prefix: [PREFIX.AUTH, PREFIX.API_CALLING] },
});

const changePasswordSuccess = payload => ({
  type: TYPE.CHANGE_PASSWORD,
  payload: { ...payload },
  meta: { prefix: [PREFIX.AUTH, PREFIX.API_CALLED_SUCCESS] },
});

const changePasswordFailure = () => ({
  type: TYPE.CHANGE_PASSWORD,
  meta: { prefix: [PREFIX.AUTH, PREFIX.API_CALLED_FAILURE] },
});

export const login = (username, password, remember) => async (dispatch) => {
  const api = API_URLS.ACCOUNT.login({
    username,
    password,
  });
  dispatch(loggingIn);
  const { response, error } = await apiCall(api);
  if (!error && response.status === 200 && response.data.success === true) {
    dispatch(logInSuccess(response.data.data, remember));
    // dispatch(getExams());
  } else {
    dispatch(logInFailure(error));
  }
};

const loginWithToken = () => async (dispatch) => {
  const api = API_URLS.ACCOUNT.loginWithToken();
  dispatch(loggingInWithToken);
  const username = localStorage.getItem('role');
  const refresh_token = localStorage.getItem('refresh_token');
  const payload = { username, refresh_token };
  const { response, error } = await apiCall({ ...api, payload });
  if (!error && response.status === 200 && response.data.success === true) {
    dispatch(logInSuccessWithToken(response.data.data));
    // dispatch(getExams());
  } else {
    dispatch(logInFailureWithToken(error));
  }
};

export const loginWithTokenIfNeed = () => (dispatch, getState) => {
  const state = getState();
  const isFetching = select(state, 'authReducer', 'isFetching');
  const isAuthenticated = select(state, 'authReducer', 'isAuthenticated');
  const jwt = localStorage.getItem('jwt');
  if (!isFetching && !isAuthenticated && jwt) {
    dispatch(loginWithToken());
  }
};

export const changePassword = (payload, meta) => async (dispatch) => {
  const api = API_URLS.ACCOUNT.changePassword();
  dispatch(changingPassword());
  const { response, error } = await apiCall({ ...api, payload });
  if (!error && response.status === 200 && response.data.success === true) {
    dispatch(changePasswordSuccess(response.data));
    if (meta && meta.onSuccess) {
      meta.onSuccess();
    }
  } else {
    dispatch(changePasswordFailure());
    if (meta && meta.onSuccess) {
      meta.onError(error);
    }
  }
};

export const logOut = () => ({
  type: TYPE.LOG_OUT,
  meta: { prefix: [PREFIX.AUTH] },
});
