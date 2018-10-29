import api from '../../config/api';

export const CALL_API = Symbol('Call Api');

export const apiCall = store => next => action => {
  const callAPI = action[CALL_API];

  if (typeof callAPI === 'undefined') return next(action)

  const { url, types, method } = callAPI;
  const [ requestType, successType, errorType ] = types;

  store.dispatch({type: requestType})

  return api({ method, url }).then(
    response => next({ payload: response.data, type: successType }),
    error => next({ error: error.message || 'There was an error.', type: errorType })
  ).catch(err => {
    throw new Error("No token saved or token expired!");
  })
}
