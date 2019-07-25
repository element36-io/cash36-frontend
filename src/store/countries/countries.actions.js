import api from '../../config/api';
import { handleError } from '../../helpers/error.helpers';

export const GET_COUNTRIES = 'GET_COUNTRIES';

export const getCountries = () => async dispatch => {
  try {
    const response = await Promise.all([
      api.get('/compliance/data/countries'),
      api.get('/compliance/data/nationalities')
    ]);

    dispatch({
      type: GET_COUNTRIES,
      payload: {
        countries: response[0].data,
        nationalities: response[1].data
      }
    });
  } catch (error) {
    return handleError(error);
  }
};
