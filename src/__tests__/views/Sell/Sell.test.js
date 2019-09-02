import React from 'react';
import Web3 from 'web3';

import { renderWithRedux } from '../../../helpers/tests.helpers';
import { Web3Context } from '../../../providers/web3.provider';

import Sell from '../../../views/Sell';

const initialState = {
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
  auth: {
    user: {
      account: '0x89b5c95edf8aeca1366f83043e805aebe1992cce'
    }
  }
};

describe('step 0', () => {
  let component;

  beforeEach(() => {
    component = renderWithRedux(
      <Web3Context.Provider
        value={{
          networkId: '3',
          network: 'Ropsten',
          web3: new Web3()
        }}
      >
        <Sell />
      </Web3Context.Provider>,
      { initialState }
    );
  });

  test('renders the component', () => {
    const { getByText } = component;

    expect(getByText(/sell tokens/i)).toBeInTheDocument();
    expect(getByText(/available balance/i)).toBeInTheDocument();
    expect(getByText(/next step/i)).toBeInTheDocument();
    expect(getByText(/choose amount/i)).toBeInTheDocument();
    expect(getByText(/select token/i)).toBeInTheDocument();
  });
});
