import countriesReducer from '../../../store/countries/countries.reducer';
import { GET_COUNTRIES } from '../../../store/countries/countries.types';

test('updates the state after GET_COUNTRIES was called', () => {
  const countries = [{ code: 'CH', name: 'Switzerland' }];
  const action = {
    type: GET_COUNTRIES,
    payload: countries
  };

  const state = countriesReducer({}, action);

  expect(state).toEqual(countries);
});
