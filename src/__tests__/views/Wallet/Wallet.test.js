import React from 'react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { AvatarContext } from '../../../providers/avatar.provider';
import { renderWithRouter } from '../../../helpers/tests.helpers';
import { Wallet } from '../../../views/Wallet/Wallet';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

test('stays on the / route if user is authenticated', async () => {
  const store = mockStore({
    contacts: {
      fetching: false
    },
    tokens: {
      fetchingTokens: false,
      fetchingFilters: false
    },
    auth: {
      user: {
        username: '0x000000001'
      }
    },
    notifications: {
      badgeCount: 0
    }
  });

  const { history } = renderWithRouter(
    <Provider store={store}>
      <AvatarContext.Provider value={{ state: {} }}>
        <Wallet isAuthenticated />
      </AvatarContext.Provider>
    </Provider>,
    {
      route: '/'
    }
  );

  expect(history.location.pathname).toBe('/');
});

test('redirects to Login if user is not authenticated', () => {
  const store = mockStore();

  const { history } = renderWithRouter(
    <Provider store={store}>
      <Wallet isAuthenticated={false} />
    </Provider>,
    {
      route: '/'
    }
  );

  expect(history.location.pathname).toBe('/login');
});
