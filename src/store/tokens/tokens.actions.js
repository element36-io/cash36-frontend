import API from '../../config/api';
import { handleError } from '../../helpers/error.helpers';

export const GET_TOKENS = 'GET_TOKENS';

export const GET_USER_ACTIVITY = 'GET_USER_ACTIVITY';
export const FETCHING_FILTERS = 'FETCHING_FILTERS';
export const HISTORY_FILTERED = 'HISTORY_FILTERED';

export const getTokens = () => async dispatch => {
  try {
    dispatch({
      type: GET_TOKENS,
      payload: {
        fetchingTokens: true
      }
    });

    const response = await API.get('/exchange/tokens');

    dispatch({
      type: GET_TOKENS,
      payload: { tokens: response.data, fetchingTokens: false }
    });
  } catch (error) {
    dispatch({
      type: GET_TOKENS,
      payload: {
        fetchingTokens: false
      }
    });
    return handleError(error);
  }
};

export const getUserActivity = queryParams => async dispatch => {
  let params = '';
  if (queryParams) {
    const keys = Object.keys(queryParams)
      .reduce((acc, key) => {
        if (queryParams[key]) {
          acc.push(`${key}=${queryParams[key]}`);
        }
        return acc;
      }, [])
      .join('&');

    params = `?${keys}`;
  }

  try {
    dispatch({
      type: FETCHING_FILTERS,
      payload: true
    });
    const response = await API.get(`/exchange/tokens/history${params}`);

    dispatch({
      type: FETCHING_FILTERS,
      payload: false
    });

    dispatch({
      type: GET_USER_ACTIVITY,
      payload: response.data
    });

    if (params) {
      if (params === '?') {
        dispatch({
          type: HISTORY_FILTERED,
          payload: false
        });
      } else {
        dispatch({
          type: HISTORY_FILTERED,
          payload: true
        });
      }
    }
  } catch (error) {
    return handleError(error);
  }
};
