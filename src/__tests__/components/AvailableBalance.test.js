import React from 'react';
import { render } from '@testing-library/react';

import AvailableBalance from '../../components/AvailableBalance';
import { formatAmount } from '../../helpers/currencies.helpers';

const symbol = 'CHF36';
const balance = 15;

test('renders the component and shows appropriate message', () => {
  const { getByText } = render(
    <AvailableBalance symbol={symbol} balance={balance} />
  );

  expect(
    getByText(`Available Balance: ${formatAmount(balance)} ${symbol}`)
  ).toBeVisible();
});
