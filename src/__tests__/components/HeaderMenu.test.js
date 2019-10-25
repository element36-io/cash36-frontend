import React from 'react';

import { renderWithAvatarContext } from '../../helpers/tests.helpers';

import HeaderMenu from '../../components/Header/HeaderMenu';
import { fireEvent } from '@testing-library/react';

const props = {
  logout: jest.fn(),
  user: {
    avatarUri: null,
    name: 'John Doe',
    username: 'john@test.com',
    currentLevel: 'Tier_0'
  }
};

test('renders the component', () => {
  const { getByText } = renderWithAvatarContext(<HeaderMenu {...props} />);

  expect(getByText(/logout/i)).toBeInTheDocument();
  expect(getByText(/register an organization/i)).toBeInTheDocument();
});

test('calls logout in click', () => {
  const logout = jest.fn();
  props.logout = logout;
  const { getByText } = renderWithAvatarContext(<HeaderMenu {...props} />);

  fireEvent.click(getByText(/logout/i));

  expect(logout).toHaveBeenCalledTimes(1);
});
