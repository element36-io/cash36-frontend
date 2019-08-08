import React from 'react';
import { render, waitForElement } from '@testing-library/react';

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
  },
  {
    balance: 0,
    controllerAddress: '0x0000000000000000000000000000000000000001',
    name: 'British Pounds',
    symbol: 'GBP36',
    tokenAddress: '0xaf674c4f757871bffda4c06d7f251f4012b70edf',
    totalSupply: 1000
  },
  {
    balance: 0,
    controllerAddress: '0x0000000000000000000000000000000000000001',
    name: 'US Dollar',
    symbol: 'USD36',
    tokenAddress: '0xd46d164d2643cc8ed1b4abcaaf537a46b00b8df4',
    totalSupply: 1000
  }
];

const getTokens = jest.fn();

test('renders the component', () => {
  const { container } = render(
    <BalanceCards tokens={tokens} getTokens={getTokens} />
  );

  expect(container.firstChild).toBeVisible();
});

test('renders 4 balance cards if getTokens resolves', async () => {
  const { getAllByTestId } = render(
    <BalanceCards tokens={tokens} getTokens={getTokens} />
  );

  expect(getTokens).toHaveBeenCalled();
  await waitForElement(() => getAllByTestId('balance-card'));
  expect(getAllByTestId('balance-card').length).toBe(4);
});

test('renders no tokens if getTokens rejects', async () => {
  const getTokens = jest
    .fn()
    // eslint-disable-next-line prefer-promise-reject-errors
    .mockReturnValue(Promise.reject('error message'));

  const { queryAllByTestId } = render(
    <BalanceCards tokens={tokens} getTokens={getTokens} />
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

  const { getByText } = render(
    <BalanceCards tokens={tokens} getTokens={getTokens} />
  );

  expect(getTokens).toHaveBeenCalled();
  await waitForElement(() => getByText('Fetching data error - error message'));
  expect(getByText('Fetching data error - error message')).toBeVisible();
});
