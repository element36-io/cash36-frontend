import React from 'react';
import { render } from '@testing-library/react';

import BalanceCard from '../../components/BalanceCard';
import { formatAmount } from '../../helpers/currencies.helpers';

const props = {
  symbol: 'CHF36',
  name: 'Swiss Franc',
  balance: 1000
};

test('renders the component and shows token info', () => {
  const { getByText } = render(<BalanceCard {...props} />);

  expect(getByText(props.symbol)).toBeVisible();
  expect(getByText(`${props.name} Balance`)).toBeVisible();
  expect(getByText(formatAmount(props.balance))).toBeVisible();
});

test('shows token icon', () => {
  const { getByAltText } = render(<BalanceCard {...props} />);

  expect(getByAltText('FRANC TOKEN')).toBeVisible();
});
