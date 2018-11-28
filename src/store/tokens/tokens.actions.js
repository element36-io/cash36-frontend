import API from '../../config/api';

export const GET_TOKENS = 'GET_TOKENS';
export const GET_USER_ACTIVITY = 'GET_USER_ACTIVITY';

export const getTokens = () => async dispatch => {
  try {
    const response = await API.get('/cash36/tokens');

    dispatch({
      type: GET_TOKENS,
      payload: response.data
    });
  } catch (error) {
    console.log(error);
  }
};

export const getUserActivity = (queryParams) => async dispatch => {
  let params = '';
  if (queryParams) {
    const keys = Object.keys(queryParams).reduce((acc, key) => {
      if (queryParams[key]) {
        acc.push(`${key}=${queryParams[key]}`);
      }
      return acc;
    }, []).join('&');

    params = `?${keys}`;
  }

  try {
    const response = await API.get(`/cash36/tokens/history${params}`);

    dispatch({
      type: GET_USER_ACTIVITY,
      payload: response.data
    });
  } catch (error) {
    console.log(error);
  }
};
