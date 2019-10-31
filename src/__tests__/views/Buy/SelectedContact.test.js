import React from 'react';

import { renderWithAvatarContext } from '../../../helpers/tests.helpers';
import SelectedContact from '../../../views/Buy/SelectedContact';

const contact = {
  contactName: 'John',
  avatarUrl: null,
  contactAddress: '0x89b5c95edf8aeca1366f83043e805aebe1992cce'
};

test('renders the component', () => {
  const { getByText } = renderWithAvatarContext(
    <SelectedContact contact={contact} />
  );

  expect(getByText(/john/i)).toBeInTheDocument();
});
