import React from 'react';
import Web3 from 'web3';

import { renderWithRedux } from '../../../helpers/tests.helpers';
import Transfer from '../../../views/Transfer';
import { Web3Context } from '../../../providers/web3.provider';
import { AvatarContext } from '../../../providers/avatar.provider';

const props = {
  location: {
    pathname: '/transfer',
    state: undefined
  },
  getTokens: jest.fn(),
  getContacts: jest.fn()
};

const initialState = {
  auth: {
    user: {
      account: '0x89b5c95edf8aeca1366f83043e805aebe1992ccb',
      networkId: '4'
    }
  },
  tokens: [
    {
      name: 'Swiss Franc',
      symbol: 'CHF36'
    },
    {
      name: 'Euro',
      symbol: 'EUR36'
    }
  ],
  contacts: {
    contactsList: [
      {
        id: '1',
        avatarUrl: null,
        contactAddress: '0x89b5c95edf8aeca1366f83043e805aebe1992ccb',
        contactName: 'John'
      }
    ]
  }
};

test('renders the component', async () => {
  const { getByText } = renderWithRedux(
    <Web3Context.Provider
      value={{
        networkId: '3',
        network: 'TestNetwork',
        web3: new Web3()
      }}
    >
      <AvatarContext.Provider value={{ state: {} }}>
        <Transfer {...props} />
      </AvatarContext.Provider>
    </Web3Context.Provider>,
    { initialState }
  );

  expect(getByText(/transfer tokens to/i)).toBeInTheDocument();
  expect(getByText(/next step/i)).toBeInTheDocument();
});
