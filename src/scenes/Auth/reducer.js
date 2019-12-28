/* eslint-disable default-case */
import { fromJS } from 'immutable';
import { TYPE } from '../../config/actions';
import {
  isCallingApi,
  isSuccessfulApiCall,
  isFailedApiCall,
} from '../../utils/actionDedicate';

const initialState = fromJS({
  isFetching: false,
  didInvalidate: true,
  isAuthenticated: false,
  error: false,
  authUser: {},
  role: {},
  api: {},
  forwardLocation: {},
  UserTypeID: '',
});

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case TYPE.LOG_IN:
      if (isCallingApi(action)) {
        return state.merge(
          fromJS({
            isFetching: true,
            error: false,
          }),
        );
      }
      if (isSuccessfulApiCall(action)) {
        const {
          user,
          token,
          role,
          refresh_token,
        } = action.payload;
        localStorage.setItem('jwt', token);
        localStorage.setItem('refresh_token', refresh_token);
        localStorage.setItem('role', role);
        return state.merge(
          fromJS({
            isAuthenticated: true,
            isFetching: false,
            role,
            error: false,
            authUser: user,
          }),
        );
      }
      if (isFailedApiCall(action)) {
        return state.merge(
          fromJS({
            isAuthenticated: false,
            isFetching: false,
            error: true,
          }),
        );
      }
      return state;
    case TYPE.LOG_IN_TOKEN:
      if (isCallingApi(action)) {
        return state.merge(
          fromJS({
            isFetching: true,
            error: false,
          }),
        );
      }
      if (isSuccessfulApiCall(action)) {
        const {
          token,
          refresh_token,
        } = action.payload;
        localStorage.setItem('jwt', token);
        localStorage.setItem('refresh_token', refresh_token);
        return state.merge(
          fromJS({
            isAuthenticated: true,
            isFetching: false,
            role: localStorage.getItem('role'),
            error: false,
          }),
        );
      }
      if (isFailedApiCall(action)) {
        return state.merge(
          fromJS({
            isAuthenticated: false,
            isFetching: false,
            error: true,
          }),
        );
      }
      return state;
    case TYPE.LOG_OUT:
      localStorage.clear();
      return state.merge(initialState);
    case TYPE.SAVE_FORWARD_LOCATION:
      return state.merge(fromJS({ forwardLocation: action.payload }));
    default:
      return state;
  }
};

export default authReducer;
