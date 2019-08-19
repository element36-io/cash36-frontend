import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import mockAxios from 'axios';

import {
  GET_TOKENS,
  FETCHING_FILTERS,
  GET_USER_ACTIVITY,
  HISTORY_FILTERED
} from '../../../store/tokens/tokens.types';

import {
  getTokens,
  getUserActivity
} from '../../../store/tokens/tokens.actions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

test('dispatches getTokens action', async () => {
  const tokens = [
    {
      symbol: 'CHF36'
    }
  ];

  mockAxios.get.mockImplementationOnce(() => Promise.resolve({ data: tokens }));

  const store = mockStore();

  const expectedActions = [
    {
      type: GET_TOKENS,
      payload: {
        fetchingTokens: true
      }
    },
    {
      type: GET_TOKENS,
      payload: {
        tokens,
        fetchingTokens: false
      }
    }
  ];

  await store.dispatch(getTokens());

  expect(store.getActions()).toEqual(expectedActions);
  expect(mockAxios.get).toHaveBeenCalledTimes(1);
  mockAxios.get.mockRestore();
});

test('dispatches getUserActivity with no queryParams', async () => {
  const userActivity = [{ activity: 'activity' }];

  mockAxios.get.mockImplementationOnce(() =>
    Promise.resolve({ data: userActivity })
  );

  const store = mockStore();

  const expectedActions = [
    { type: FETCHING_FILTERS, payload: true },
    { type: FETCHING_FILTERS, payload: false },
    { type: GET_USER_ACTIVITY, payload: userActivity }
  ];

  await store.dispatch(getUserActivity());

  expect(store.getActions()).toEqual(expectedActions);
  expect(mockAxios.get).toHaveBeenCalledTimes(1);
  mockAxios.get.mockRestore();
});

test('dispatches getUserActivity with empty queryParams', async () => {
  const userActivity = [{ activity: 'activity' }];

  const queryParams = {
    filterValue: '',
    from: '',
    to: '',
    status: ''
  };

  mockAxios.get.mockImplementationOnce(() =>
    Promise.resolve({ data: userActivity })
  );

  const store = mockStore();

  const expectedActions = [
    { type: FETCHING_FILTERS, payload: true },
    { type: FETCHING_FILTERS, payload: false },
    { type: GET_USER_ACTIVITY, payload: userActivity },
    { type: HISTORY_FILTERED, payload: false }
  ];

  await store.dispatch(getUserActivity(queryParams));

  expect(store.getActions()).toEqual(expectedActions);
  expect(mockAxios.get).toHaveBeenCalledTimes(1);

  mockAxios.get.mockRestore();
});

test('dispatches getUserActivity with queryParams', async () => {
  const userActivity = [{ activity: 'activity' }];

  const queryParams = {
    filterValue: 'test',
    from: '',
    to: '',
    status: 'test'
  };

  mockAxios.get.mockImplementationOnce(() =>
    Promise.resolve({ data: userActivity })
  );

  const store = mockStore();

  const expectedActions = [
    { type: FETCHING_FILTERS, payload: true },
    { type: FETCHING_FILTERS, payload: false },
    { type: GET_USER_ACTIVITY, payload: userActivity },
    { type: HISTORY_FILTERED, payload: true }
  ];

  await store.dispatch(getUserActivity(queryParams));

  expect(store.getActions()).toEqual(expectedActions);
  expect(mockAxios.get).toHaveBeenCalledTimes(1);

  mockAxios.get.mockRestore();
});
