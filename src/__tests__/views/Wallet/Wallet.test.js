import React from 'react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Web3 from 'web3';

import { Web3Context } from '../../../providers/web3.provider';
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
    },
    wallets: {
      walletList: [
        {
          accountAddress: '0x0000081c040b341cc943a67872b737349048cb11',
          mainWallet: true
        }
      ]
    }
  });
  const { history } = renderWithRouter(
    <Web3Context.Provider
      value={{
        networkId: '3',
        network: 'TestNetwork',
        web3: new Web3()
      }}
    >
      <Provider store={store}>
        <AvatarContext.Provider value={{ state: {} }}>
          <Wallet isAuthenticated />
        </AvatarContext.Provider>
      </Provider>
    </Web3Context.Provider>,
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
