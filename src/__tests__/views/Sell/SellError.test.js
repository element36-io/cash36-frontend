import React from 'react';

import { renderWithRouter } from '../../../helpers/tests.helpers';
import SellError from '../../../views/Sell/SellError';

test('renders the component', () => {
  const { getByText } = renderWithRouter(
    <SellError message={'selling error'} />
  );

  expect(getByText(/selling unsuccessful/i)).toBeInTheDocument();
  expect(getByText(/selling error/i)).toBeInTheDocument();
  expect(getByText(/go to account history/i)).toBeInTheDocument();
  expect(getByText(/back to homepage/i)).toBeInTheDocument();
});
