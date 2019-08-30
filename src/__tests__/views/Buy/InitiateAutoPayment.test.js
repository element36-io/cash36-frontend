import React from 'react';
import { render } from '@testing-library/react';

import InitiateAutoPayment from '../../../views/Buy/InitiateAutoPayment';

test('renders the component', () => {
  const { getByText } = render(<InitiateAutoPayment />);

  expect(getByText(/initiate the payment/i)).toBeInTheDocument();
});
