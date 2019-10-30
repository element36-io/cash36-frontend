import React from 'react';
import { fireEvent } from '@testing-library/react';
import { renderWithRouterAndRedux } from '../../../helpers/tests.helpers';
import Login from '../../../views/Login';

const initialState = {
  auth: {
    isAuthenticated: false
  }
};

describe('test Login component', () => {
  test('renders the component', () => {
    const { getByTestId } = renderWithRouterAndRedux(<Login />, {
      initialState
    });

    expect(getByTestId('login_component')).toBeVisible();
  });

  test('test routing', () => {
    const { getByText, history } = renderWithRouterAndRedux(<Login />, {
      initialState,
      route: '/login'
    });
    const registerLink = getByText(/Sign up/i);

    expect(history.location.pathname).toBe('/login');
    fireEvent.click(registerLink);
    expect(history.location.pathname).toBe('/register');
  });
});
