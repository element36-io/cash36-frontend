import React from 'react';
import { fireEvent } from '@testing-library/react';

import { renderWithRouter } from '../../helpers/tests.helpers';
import ResetPassword from '../../views/ResetPassword';

test('renders the component', () => {
  const { getByText } = renderWithRouter(<ResetPassword />);

  expect(getByText(/reset password/i)).toBeInTheDocument();
});

test('goes back to login', () => {
  const { getByText, history } = renderWithRouter(<ResetPassword />, {
    route: '/reset-password'
  });

  expect(history.location.pathname).toBe('/reset-password');

  fireEvent.click(getByText(/back to login/i));

  expect(history.location.pathname).toBe('/login');
});
