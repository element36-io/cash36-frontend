import api from '../../config/api';

export const GET_TOKENS = 'GET_TOKENS';

export const getTokens = () => async dispatch => {
  try {
    const response = await api.get('/cash36/tokens');

    dispatch({
      type: GET_TOKENS,
      payload: response.data
    });
  } catch (error) {
    console.log(error);
  }
};
