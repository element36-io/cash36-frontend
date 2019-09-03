import React from 'react';

import { renderWithRouter } from '../../../helpers/tests.helpers';
import SellSuccess from '../../../views/Sell/SellSuccess';

test('renders the component', () => {
  const { getByText } = renderWithRouter(
    <SellSuccess amount="10" symbol="CHF36" />
  );

  expect(getByText(/10.00/i)).toBeInTheDocument();
  expect(getByText(/success/i)).toBeInTheDocument();
  expect(getByText(/10 chf36/i)).toBeInTheDocument();
  expect(getByText(/go to account history/i)).toBeInTheDocument();
  expect(getByText(/back to homepage/i)).toBeInTheDocument();
});
