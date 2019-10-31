import React from 'react';

import { renderWithAvatarContext } from '../../../helpers/tests.helpers';
import TransferContacts from '../../../views/Buy/TransferContacts';

const props = {
  clickCallback: jest.fn(),
  contactsList: [
    {
      id: '1',
      avatarUrl: null,
      contactAddress: '0x89b5c95edf8aeca1366f83043e805aebe1992ccb',
      contactName: 'John'
    },
    {
      id: '2',
      avatarUrl: null,
      contactAddress: '0x89b5c95edf8aeca1366f83043e805aebe1992cca',
      contactName: 'Jane'
    }
  ]
};

test('renders the component', () => {
  const { getByText } = renderWithAvatarContext(
    <TransferContacts {...props} />
  );

  expect(getByText(/john/i)).toBeInTheDocument();
  expect(getByText(/jane/i)).toBeInTheDocument();
});
