import React from 'react';

import { renderWithRouter } from '../../../helpers/tests.helpers';
import TransferSuccess from '../../../views/Transfer/TransferSuccess';

const props = {
  symbol: 'EUR36',
  amount: '25',
  target: {
    contactName: 'John',
    contactAddress: '0x89b5c95edf8aeca1366f83043e805aebe1992cce'
  }
};

test('renders the component', () => {
  const { getByText } = renderWithRouter(<TransferSuccess {...props} />);

  expect(
    getByText(/you've successfully transfered 25 eur36/i)
  ).toBeInTheDocument();
  expect(getByText(/transfer successful/i)).toBeInTheDocument();
  expect(getByText(/go to account history/i)).toBeInTheDocument();
  expect(getByText(/back to homepage/i)).toBeInTheDocument();
});
