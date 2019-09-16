import React from 'react';

import { renderWithRouter } from '../../../helpers/tests.helpers';
import TransferError from '../../../views/Transfer/TransferError';

test('renders the component', () => {
  const errorMessage = 'there was an error';
  const { getByText } = renderWithRouter(
    <TransferError message={errorMessage} />
  );

  expect(getByText(errorMessage)).toBeInTheDocument();
  expect(getByText(/transfer unsuccessful/i)).toBeInTheDocument();
  expect(getByText(/go to account history/i)).toBeInTheDocument();
  expect(getByText(/back to homepage/i)).toBeInTheDocument();
});
