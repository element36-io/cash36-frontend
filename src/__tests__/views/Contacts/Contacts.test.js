import React from 'react';
import Web3 from 'web3';

import { renderWithRedux } from '../../../helpers/tests.helpers';

import Contacts from '../../../views/Contacts';
import { Web3Context } from '../../../providers/web3.provider';

const initialState = {
  auth: {
    user: {
      username: '0x00000000001',
      useMetamask: false
    }
  }
};

test('renders the component', () => {
  const { getByTestId } = renderWithRedux(
    <Web3Context.Provider
      value={{
        networkId: '3',
        network: 'TestNetwork',
        web3: new Web3()
      }}
    >
      <Contacts />
    </Web3Context.Provider>,
    { initialState }
  );

  expect(getByTestId('contacts')).toBeInTheDocument();
});
