import React from 'react';

import { renderWithRouter } from '../../../helpers/tests.helpers';
import BuyError from '../../../views/Buy/BuyError';

test('renders the component', () => {
  const { getByText } = renderWithRouter(
    <BuyError message="there was an error" />
  );

  expect(getByText(/there was an error/i)).toBeInTheDocument();
  expect(getByText(/go to account history/i)).toBeInTheDocument();
  expect(getByText(/back to homepage/i)).toBeInTheDocument();
});
