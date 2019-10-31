import React from 'react';

import { renderWithAvatarContextAndRouter } from '../../../helpers/tests.helpers';
import TransferAddress from '../../../views/Buy/TransferAddress';

const props = {
  contactsList: [
    {
      id: '1',
      avatarUrl: null,
      contactAddress: '0x89b5c95edf8aeca1366f83043e805aebe1992ccb',
      contactName: 'John'
    }
  ]
};

test('renders the component', () => {
  const { getByText } = renderWithAvatarContextAndRouter(
    <TransferAddress {...props} />
  );

  expect(getByText(/contacts/i)).toBeInTheDocument();
  expect(getByText(/next step/i)).toBeInTheDocument();
});
