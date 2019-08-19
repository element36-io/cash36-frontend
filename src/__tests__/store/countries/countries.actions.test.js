import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import mockAxios from 'axios';

import { GET_COUNTRIES } from '../../../store/countries/countries.types';

import { getCountries } from '../../../store/countries/countries.actions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

test('dispatches getCountries action', async () => {
  const countries = [{ code: 'CH', name: 'Switzerland' }];
  const nationalities = [{ code: 'CH', name: 'Switzerland' }];

  mockAxios.get.mockImplementation(() =>
    Promise.resolve({
      data: [{ code: 'CH', name: 'Switzerland' }]
    })
  );

  const store = mockStore();

  const expectedActions = [
    {
      type: GET_COUNTRIES,
      payload: {
        countries,
        nationalities
      }
    }
  ];

  await store.dispatch(getCountries());

  expect(store.getActions()).toEqual(expectedActions);
  expect(mockAxios.get).toHaveBeenCalledTimes(2);
  mockAxios.get.mockRestore();
});
