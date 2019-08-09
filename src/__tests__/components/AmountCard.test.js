import React from 'react';
import { render } from '@testing-library/react';

import AmountCard from '../../components/AmountCard';
import { formatAmount } from '../../helpers/currencies.helpers';

const symbol = 'CHF36';
const amount = '15';

test('renders the component', () => {
  const { getByText } = render(<AmountCard amount={amount} symbol={symbol} />);

  expect(getByText('CHF36')).toBeVisible();
});

test('shows the correct amount', () => {
  const { getByText } = render(<AmountCard amount={amount} symbol={symbol} />);

  expect(getByText(`-${formatAmount(amount)}`)).toBeVisible();
});

test('shows the correct symbol', () => {
  const { getByText } = render(<AmountCard amount={amount} symbol={symbol} />);

  expect(getByText(symbol)).toBeVisible();
});

test('displays the proper token icon', () => {
  const { getByAltText } = render(
    <AmountCard amount={amount} symbol={symbol} />
  );

  expect(getByAltText('FRANC TOKEN')).toBeVisible();
});
