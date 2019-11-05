import React from 'react';
import { fireEvent, cleanup } from '@testing-library/react';

import { renderWithAvatarContextAndRouter } from '../../helpers/tests.helpers';

import ManageWallets from '../../components/ManageWallets';

const initialState = {
  wallets: {
    walletList: [
      {
        accountAddress: '0x000000000000000000000000000000000000001',
        contractAddress: null,
        creationDate: '2019-10-28T14:31:17.152+0000',
        mainWallet: true,
        networkId: '4',
        shortDescription: 'My Wallet 1',
        walletType: 'METAMASK'
      },
      {
        accountAddress: '0x683861b4a4638a3ad82caf434a84f4da003ab9e8',
        contractAddress: null,
        creationDate: '2019-10-28T14:31:17.152+0000',
        mainWallet: true,
        networkId: '4',
        shortDescription: 'My Wallet 2',
        walletType: 'UPORT'
      }
    ]
  }
};

test('renders the component', () => {
  const { getByText } = renderWithAvatarContextAndRouter(<ManageWallets />, {
    initialState
  });

  expect(getByText(/manage wallets/i)).toBeInTheDocument();
});

test('opens and renders dialog content', () => {
  const { getByText } = renderWithAvatarContextAndRouter(<ManageWallets />, {
    initialState
  });

  fireEvent.click(getByText(/manage wallets/i));

  expect(getByText('My Wallet 1')).toBeInTheDocument();
  expect(getByText('My Wallet 2')).toBeInTheDocument();

  cleanup();
});
