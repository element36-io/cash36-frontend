import React from 'react';
import { render } from '@testing-library/react';

import SelectedContact from '../../../views/Transfer/SelectedContact';
import { AvatarContext } from '../../../providers/avatar.provider';

const contact = {
  contactName: 'John',
  avatarUrl: null,
  contactAddress: '0x89b5c95edf8aeca1366f83043e805aebe1992cce'
};

test('renders the component', () => {
  const { getByText } = render(
    <AvatarContext.Provider value={{ state: {} }}>
      <SelectedContact contact={contact} />
    </AvatarContext.Provider>
  );

  expect(getByText(/john/i)).toBeInTheDocument();
});
