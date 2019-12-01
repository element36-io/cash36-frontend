import API from '../../config/api';
import { handleError } from '../../helpers/error.helpers';

import { GET_COUNTRIES } from './countries.types';

export const getCountries = () => async dispatch => {
  try {
    const response = await API.get('/compliance/data/fatfcountries');

    dispatch({
      type: GET_COUNTRIES,
      payload: {
        countries: response.data
      }
    });
  } catch (error) {
    return handleError(error);
  }
};
