import React from 'react';

import { renderWithRouter } from '../../../helpers/tests.helpers';
import SellConfirmation from '../../../views/Sell/SellConfirmation';

test('renders the component', () => {
  const { getByText } = renderWithRouter(<SellConfirmation />);

  expect(getByText(/awaiting confirmation/i)).toBeInTheDocument();
  expect(getByText(/The transaction is initiated/i)).toBeInTheDocument();
  expect(getByText(/go to account history/i)).toBeInTheDocument();
  expect(getByText(/back to homepage/i)).toBeInTheDocument();
});
