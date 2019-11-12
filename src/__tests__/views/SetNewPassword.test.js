import React from 'react';
import { fireEvent } from '@testing-library/react';

import { renderWithRouter } from '../../helpers/tests.helpers';
import SetNewPassword from '../../views/SetNewPassword';

test('renders the component', () => {
  const { getByText } = renderWithRouter(<SetNewPassword />);

  expect(getByText(/set new password/i)).toBeInTheDocument();
});

test('goes back to login', () => {
  const { getByText, history } = renderWithRouter(<SetNewPassword />, {
    route: '/set-new-password'
  });

  expect(history.location.pathname).toBe('/set-new-password');

  fireEvent.click(getByText(/back to login/i));

  expect(history.location.pathname).toBe('/login');
});
