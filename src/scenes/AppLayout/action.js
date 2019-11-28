import { TYPE, PREFIX } from '../../config/actions';

export const setPage = payload => ({
  type: TYPE.SET_PAGE,
  meta: { prefix: [PREFIX.AUTH, PREFIX.API_CALLING] },
  payload,
});

export const pushNotification = ({
  message, description, type, key,
}) => ({
  type: TYPE.PUSH_NOTIFICATION,
  payload: {
    message, description, type, key,
  },
  meta: { prefix: [PREFIX.APP_LAYOUT, PREFIX.NOTIFICATION] },
});

export const popNotification = notification => ({
  type: TYPE.POP_NOTIFICATION,
  payload: notification,
  meta: { prefix: [PREFIX.APP_LAYOUT, PREFIX.NOTIFICATION] },
});
