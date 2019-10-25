import React from 'react';

import { renderWithRouter } from '../../../helpers/tests.helpers';
import TransferConfirmation from '../../../views/Transfer/TransferConfirmation';

test('renders the component', () => {
  const { getByText } = renderWithRouter(<TransferConfirmation />);

  expect(getByText(/The transaction is initiated/i)).toBeInTheDocument();
  expect(getByText(/go to account history/i)).toBeInTheDocument();
  expect(getByText(/back to homepage/i)).toBeInTheDocument();
});
