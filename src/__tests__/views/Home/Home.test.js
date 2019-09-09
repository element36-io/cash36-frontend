import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { renderWithRedux } from '../../../helpers/tests.helpers';
import Home from '../../../views/Home';
import { AvatarContext } from '../../../providers/avatar.provider';

const initialState = {
  auth: {
    isAuthenticated: true,
    user: {
      username: '0x000000000001'
    }
  }
};

test('renders the component', async () => {
  const { getByTestId } = renderWithRedux(
    <BrowserRouter>
      <AvatarContext.Provider value={{ state: {} }}>
        <Home />
      </AvatarContext.Provider>{' '}
    </BrowserRouter>,
    {
      initialState
    }
  );

  expect(getByTestId('home-page')).toBeInTheDocument();
});
