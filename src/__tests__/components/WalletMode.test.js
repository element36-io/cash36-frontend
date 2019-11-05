import React from 'react';

import { renderWithRedux } from '../../helpers/tests.helpers';

import WalletMode from '../../components/WalletMode';

const initialState = {
  wallets: {
    walletList: [
      {
        walletType: 'METAMASK',
        accountAddress: '0x0000000000000001',
        mainWallet: true
      }
    ]
  }
};

test('renders the component', () => {
  const { getByTestId } = renderWithRedux(<WalletMode />, { initialState });

  expect(getByTestId('wallet-mode')).toBeVisible();
});

test('renders walletless mode', () => {
  const { getByText } = renderWithRedux(<WalletMode />, { ...{} });

  expect(getByText(/walletless mode/i)).toBeInTheDocument();
});
