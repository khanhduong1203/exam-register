import axios from 'axios';

const parseParams = (params) => {
  const keys = Object.keys(params);
  let options = '';

  keys.forEach((key) => {
    const isParamTypeObject = typeof params[key] === 'object';

    if (!isParamTypeObject && typeof params[key] !== 'undefined' && params[key] !== '') {
      options += `${key}=${params[key]}&`;
    }

    if (isParamTypeObject && params[key] != null && params[key].length >= 0) {
      params[key].forEach((element) => {
        options += `${key}=${element}&`;
      });
    }
  });

  return options ? options.slice(0, -1) : options;
};

export const apiCall = async ({
  endPoint,
  method,
  payload,
  headers,
  params,
}) => {
  try {
    const result = await axios({
      method,
      url: endPoint,
      // url: `http://localhost:8080${endPoint}`,
      headers,
      data: payload,
      params,
      paramsSerializer: params => parseParams(params),
    });
    return {
      response: result,
      error: null,
    };
  } catch (e) {
    return {
      response: null,
      error: e.request,
    };
  }
};

export const apiCallPromise = ({
  endPoint,
  method,
  payload,
  headers,
  params,
}) => axios({
  method,
  url: endPoint,
  headers,
  data: payload,
  params,
}).then(result => ({
  response: result,
  error: null,
  // eslint-disable-next-line prefer-promise-reject-errors
})).catch(e => Promise.reject({
  response: null,
  error: e.request,
}));
