import React from 'react';
import { fireEvent } from '@testing-library/react';
import { renderWithRouterAndRedux } from '../../../helpers/tests.helpers';
import Register from '../../../views/Register';

const initialState = {
  auth: {
    isAuthenticated: false
  }
};

describe('test Login component', () => {
  test('renders the component', () => {
    const { getByTestId } = renderWithRouterAndRedux(<Register />, {
      initialState
    });

    expect(getByTestId('register_component')).toBeVisible();
  });

  test('test routing', () => {
    const { getByText, history } = renderWithRouterAndRedux(<Register />, {
      initialState,
      route: '/register'
    });
    const signinLink = getByText(/sign in/i);

    expect(history.location.pathname).toBe('/register');
    fireEvent.click(signinLink);
    expect(history.location.pathname).toBe('/login');
  });
});
