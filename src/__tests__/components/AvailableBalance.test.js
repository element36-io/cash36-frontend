import React from 'react';
import { render } from '@testing-library/react';

import AvailableBalance from '../../components/AvailableBalance';
import { formatAmount } from '../../helpers/currencies.helpers';

const props = {
  symbol: 'CHF36',
  balance: 15,
  etherBalance: 1
};

test.skip('renders the component and shows appropriate message', () => {
  const { getByText } = render(<AvailableBalance {...props} />);

  expect(
    getByText(`Available Balance: ${formatAmount(15)} CHF36 (1.00 ether)`)
  ).toBeInTheDocument();
});
