import React from 'react';
import { waitForElement } from '@testing-library/react';
import { renderWithWeb3Context } from '../../helpers/tests.helpers';
import { BalanceCards } from '../../components/BalanceCards/BalanceCards';

const tokens = [
  {
    balance: 0,
    controllerAddress: '0x0000000000000000000000000000000000000001',
    name: 'Swiss Franc',
    symbol: 'CHF36',
    tokenAddress: '0x298facc1c00d1f8d036d1269b7e7cffb8686c94f',
    totalSupply: 1000
  },
  {
    balance: 0,
    controllerAddress: '0x0000000000000000000000000000000000000001',
    name: 'Euro',
    symbol: 'EUR36',
    tokenAddress: '0x95ff342a3db1a7dd6cd81ff02a4bd6dcba68f3f0',
    totalSupply: 1000
  }
];

const walletList = [
  {
    accountAddress: '0x0000081c040b341cc943a67872b737349048cb11',
    mainWallet: true
  }
];

const getTokens = jest.fn();

test('renders 4 balance cards if getTokens resolves', async () => {
  const { getAllByTestId } = renderWithWeb3Context(
    <BalanceCards
      tokens={tokens}
      getTokens={getTokens}
      walletList={walletList}
    />
  );

  expect(getTokens).toHaveBeenCalled();
  await waitForElement(() => getAllByTestId('balance-card'));
  expect(getAllByTestId('balance-card').length).toBe(3);
});

test('renders no tokens if getTokens rejects', async () => {
  const getTokens = jest
    .fn()
    // eslint-disable-next-line prefer-promise-reject-errors
    .mockReturnValue(Promise.reject('error message'));

  const { queryAllByTestId } = renderWithWeb3Context(
    <BalanceCards
      tokens={tokens}
      getTokens={getTokens}
      walletList={walletList}
    />
  );

  expect(getTokens).toHaveBeenCalled();
  await waitForElement(() => queryAllByTestId('balance-card'));
  expect(queryAllByTestId('balance-card').length).toBe(0);
});

test('renders an error message if getTokens rejects', async () => {
  const getTokens = jest
    .fn()
    // eslint-disable-next-line prefer-promise-reject-errors
    .mockReturnValue(Promise.reject('error message'));

  const { getByText } = renderWithWeb3Context(
    <BalanceCards
      tokens={tokens}
      getTokens={getTokens}
      walletList={walletList}
    />
  );

  expect(getTokens).toHaveBeenCalled();
  await waitForElement(() => getByText('Fetching data error - error message'));
  expect(getByText('Fetching data error - error message')).toBeVisible();
});

test('renders EtherBalanceCard if hasWallet is true', () => {
  const { getByText } = renderWithWeb3Context(
    <BalanceCards
      tokens={tokens}
      getTokens={getTokens}
      walletList={walletList}
    />
  );

  expect(getByText(/ether balance/i)).toBeInTheDocument();
});
