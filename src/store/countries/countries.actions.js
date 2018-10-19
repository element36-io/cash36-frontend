import api from '../../config/api';
import { logout } from '../auth/auth.actions';

export const GET_COUNTRIES = 'GET_COUNTRIES';

export const getCountries = () => async dispatch => {
  try {
    const response = await Promise.all([api.get('/cash36/data/countries'), api.get('/cash36/data/nationalities')]);

    dispatch({
      type: GET_COUNTRIES,
      payload: {
        countries: response[0].data,
        nationalities: response[1].data
      }
    });
  } catch (error) {
    if (error.response.status === 401) {
      console.log('Access unauthorized');
      dispatch(logout());
    }
    console.log(error);
  }
};
