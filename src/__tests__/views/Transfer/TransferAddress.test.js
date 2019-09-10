import React from 'react';

import { renderWithAvatarContext } from '../../../helpers/tests.helpers';
import TransferAddress from '../../../views/Transfer/TransferAddress';

const props = {
  utils: {
    isAddress: jest.fn(() => true)
  },
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
  const { getByText } = renderWithAvatarContext(<TransferAddress {...props} />);

  expect(getByText(/transfer tokens to/i)).toBeInTheDocument();
  expect(getByText(/contacts/i)).toBeInTheDocument();
  expect(getByText(/next step/i)).toBeInTheDocument();
});
