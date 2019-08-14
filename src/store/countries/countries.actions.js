import API from '../../config/api';
import { handleError } from '../../helpers/error.helpers';

import { GET_COUNTRIES } from './countries.types';

export const getCountries = () => async dispatch => {
  try {
    const response = await Promise.all([
      API.get('/compliance/data/countries'),
      API.get('/compliance/data/nationalities')
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
