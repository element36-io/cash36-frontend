import React from 'react';

import { renderWithRouter } from '../../../helpers/tests.helpers';
import TransferConfirmation from '../../../views/Transfer/TransferConfirmation';

test('renders the component', () => {
  const { getByText } = renderWithRouter(
    <TransferConfirmation
      target={{
        contactName: 'John',
        contactAddress: '0x89b5c95edf8aeca1366f83043e805aebe1992cce'
      }}
    />
  );

  expect(getByText(/before we transfer your money/i)).toBeInTheDocument();
  expect(getByText(/john/i)).toBeInTheDocument();
  expect(getByText(/go to account history/i)).toBeInTheDocument();
  expect(getByText(/back to homepage/i)).toBeInTheDocument();
});

test('renders the address if no name is present', () => {
  const { getByText } = renderWithRouter(
    <TransferConfirmation
      target={{
        contactName: null,
        contactAddress: '0x89b5c95edf8aeca1366f83043e805aebe1992cce'
      }}
    />
  );

  expect(getByText(/before we transfer your money/i)).toBeInTheDocument();
  expect(
    getByText(/0x89b5c95edf8aeca1366f83043e805aebe1992cce/i)
  ).toBeInTheDocument();
});
