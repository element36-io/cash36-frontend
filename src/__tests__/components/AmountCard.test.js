import React from 'react';
import { render } from '@testing-library/react';

import AmountCard from '../../components/AmountCard';
import { formatAmount } from '../../helpers/currencies.helpers';

const symbol = 'CHF36';
const amount = '15';

test('should render a component', () => {
  const { container } = render(<AmountCard amount={amount} symbol={symbol} />);

  expect(container.firstChild).toBeVisible();
});

test('should show the correct amount', () => {
  const { getByText } = render(<AmountCard amount={amount} symbol={symbol} />);

  expect(getByText(`-${formatAmount(amount)}`)).toBeVisible();
});

test('should show the correct symbol', () => {
  const { getByText } = render(<AmountCard amount={amount} symbol={symbol} />);

  expect(getByText(symbol)).toBeVisible();
});

test('should display the proper token icon', () => {
  const { getByAltText } = render(
    <AmountCard amount={amount} symbol={symbol} />
  );

  expect(getByAltText('FRANC TOKEN')).toBeVisible();
});
