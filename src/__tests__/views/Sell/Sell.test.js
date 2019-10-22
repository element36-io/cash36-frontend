import React from 'react';
import Web3 from 'web3';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

import { renderWithRouter } from '../../../helpers/tests.helpers';
import { Web3Context } from '../../../providers/web3.provider';

import Sell from '../../../views/Sell';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const initialState = {
  tokens: [
    {
      name: 'Swiss Franc',
      symbol: 'CHF36',
      balance: 100
    },
    {
      name: 'Euro',
      symbol: 'EUR36',
      balance: 100
    }
  ],
  auth: {
    user: {
      account: '0x89b5c95edf8aeca1366f83043e805aebe1992cce'
    }
  }
};

describe('step 0', () => {
  let component;
  const store = mockStore(initialState);

  beforeEach(() => {
    component = renderWithRouter(
      <Web3Context.Provider
        value={{
          networkId: '3',
          network: 'TestNetwork',
          web3: new Web3()
        }}
      >
        <Provider store={store}>
          <Sell getTokens={jest.fn()} noWallet={false} />
        </Provider>
      </Web3Context.Provider>,
      {
        route: '/sell'
      }
    );
  });

  test('renders the component', () => {
    const { getByText, history } = component;

    expect(getByText(/sell tokens/i)).toBeInTheDocument();
    expect(getByText(/available balance/i)).toBeInTheDocument();
    expect(getByText(/next step/i)).toBeInTheDocument();
    expect(getByText(/choose amount/i)).toBeInTheDocument();
    expect(getByText(/select token/i)).toBeInTheDocument();
    expect(history.location.pathname).toBe('/sell');
  });

  test('redirects to / if there is no wallet', () => {
    const { history } = renderWithRouter(
      <Web3Context.Provider
        value={{
          networkId: '3',
          network: 'TestNetwork',
          web3: new Web3()
        }}
      >
        <Provider store={store}>
          <Sell getTokens={jest.fn()} noWallet />
        </Provider>
      </Web3Context.Provider>,
      {
        route: '/sell'
      }
    );

    expect(history.location.pathname).toBe('/');
  });
});
