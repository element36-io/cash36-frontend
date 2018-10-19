import API from '../../config/api';
import { logout } from '../auth/auth.actions';

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
    if (error.response.status === 401) {
      console.log('Access unauthorized');
      dispatch(logout());
    }
    console.log(error);
  }
};

export const getUserActivity = () => async dispatch => {
  try {
    const response = await API.get('/cash36/tokens/history');

    dispatch({
      type: GET_USER_ACTIVITY,
      payload: response.data
    });
  } catch (error) {
    if (error.response.status === 401) {
      console.log('Access unauthorized');
      dispatch(logout());
    }
    console.log(error);
  }
};
