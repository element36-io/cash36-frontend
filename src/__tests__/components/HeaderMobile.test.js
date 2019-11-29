import React from 'react';
import { renderWithAvatarContextAndRouter } from '../../helpers/tests.helpers';

import HeaderMobile from '../../components/Header/HeaderMobile';

const initialState = {
  notifications: {
    badgeCount: 0
  },
  auth: {
    user: {
      username: 'test@example.com',
      name: 'John Doe',
      account: 'test@example.com',
      avatarUri: null,
      currentProcessStatus: 'START',
      caseId: '1',
      badgeCount: 0
    }
  },
  wallets: {
    walletList: [
      {
        accountAddress: '0xd3124977047f6aE28DdA3978B38E1fC599a5aCd1',
        contractAddress: '',
        creationDate: '',
        mainWallet: true,
        networkId: '4',
        shortDescription: 'My Wallet 1',
        walletType: 'UPORT'
      },
      {
        accountAddress: '0xd3124977047f6ad28DdA3978B38E1fC599a5aCd1',
        contractAddress: '',
        creationDate: '',
        mainWallet: false,
        networkId: '4',
        shortDescription: 'My Wallet 2',
        walletType: 'METAMASK'
      }
    ]
  }
};

const props = {
  logout: jest.fn(),
  currentLevel: 'Tier_0'
};

test('renders the component', () => {
  const { getByText } = renderWithAvatarContextAndRouter(
    <HeaderMobile {...props} />,
    {
      initialState
    }
  );

  expect(getByText(/logout/i)).toBeInTheDocument();
  expect(getByText(/buy/i)).toBeInTheDocument();
});
