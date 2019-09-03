import React from 'react';
import { render } from '@testing-library/react';

import ExchangeFee from '../../../views/Sell/ExchangeFee';

test('renders the component', () => {
  const { getByText } = render(<ExchangeFee amount={'10'} exchangeFee={1} />);

  expect(getByText(/1%/i)).toBeInTheDocument();
  expect(getByText(/exchange fee/i)).toBeInTheDocument();
  expect(getByText(/you will receive/i)).toBeInTheDocument();
  expect(getByText(/9.90/i)).toBeInTheDocument();
});
