import React from 'react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

import {
  renderWithAvatarContext,
  renderWithRouter
} from '../../helpers/tests.helpers';

import HeaderMobile from '../../components/Header/HeaderMobile';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const initialState = {
  notifications: {
    badgeCount: 0
  },
  auth: {
    user: {
      username: 'test@example.com',
      name: 'John Doe',
      account: 'test@example.com',
      avatarUri: null,
      currentProcessStatus: 'START',
      caseId: '1',
      badgeCount: 0
    }
  }
};

const props = {
  logout: jest.fn(),
  currentLevel: 'Tier_0'
};

test('renders the component', () => {
  const store = mockStore(initialState);
  const { getByText } = renderWithAvatarContext(
    <Provider store={store}>
      <HeaderMobile {...props} />
    </Provider>,
    renderWithRouter
  );

  expect(getByText(/john doe/i)).toBeInTheDocument();
  expect(getByText(/logout/i)).toBeInTheDocument();
  expect(getByText(/buy/i)).toBeInTheDocument();
});
