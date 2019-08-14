import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import mockAxios from 'axios';

import { GET_TOKENS } from '../../../store/tokens/tokens.types';

import { getTokens } from '../../../store/tokens/tokens.actions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

test('dispatches GET_TOKENS action', async () => {
  const tokens = [
    {
      symbol: 'CHF36'
    }
  ];
  mockAxios.get.mockImplementationOnce(() => Promise.resolve({ data: tokens }));

  const store = mockStore({});

  const expectedActions = [{ type: GET_TOKENS, payload: tokens }];

  await store.dispatch(getTokens());

  expect(store.getActions()).toEqual(expectedActions);
  expect(mockAxios.get).toHaveBeenCalledTimes(1);
});
