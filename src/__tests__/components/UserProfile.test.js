import React from 'react';

import { UserProfile } from '../../components/UserProfile/UserProfile';
import { renderWithRouterAndRedux } from '../../helpers/tests.helpers';
import { AvatarContext } from '../../providers/avatar.provider';

const user = {
  username: 'test@example.com',
  name: 'John Doe',
  account: 'test@example.com',
  avatarUri: null,
  currentProcessStatus: 'START',
  caseId: '1'
};

const initialState = {
  wallets: {
    walletList: []
  }
};

describe('renders user profile', () => {
  test.skip('renders the component', () => {
    const { getByTestId } = renderWithRouterAndRedux(
      <AvatarContext.Provider value={{ state: {}, actions: {} }}>
        <UserProfile user={user} />
      </AvatarContext.Provider>,
      { initialState }
    );

    expect(getByTestId('user-profile')).toBeVisible();
  });

  test.skip('renders the avatar component', () => {
    const { getByTestId } = renderWithRouterAndRedux(
      <AvatarContext.Provider value={{ state: {}, actions: {} }}>
        <UserProfile user={user} />
      </AvatarContext.Provider>,
      { initialState }
    );

    expect(getByTestId('avatar__icon')).toBeVisible();
  });

  test.skip('renders the user badge', () => {
    const { getByTestId } = renderWithRouterAndRedux(
      <AvatarContext.Provider value={{ state: {}, actions: {} }}>
        <UserProfile user={user} />
      </AvatarContext.Provider>,
      { initialState }
    );

    expect(getByTestId('tier-badge')).toBeVisible();
  });
});

describe('renders different tier levels', () => {
  test.skip('renders Tier 0 when currentLevel is Tier_0', () => {
    user.currentLevel = 'Tier_0';
    const { getByText } = renderWithRouterAndRedux(
      <AvatarContext.Provider value={{ state: {}, actions: {} }}>
        <UserProfile user={user} />
      </AvatarContext.Provider>,
      { initialState }
    );
    expect(getByText(/tier 0 user/i)).toBeVisible();
  });

  test.skip('renders Tier 0 when currentLevel is undefined', () => {
    const { getByText } = renderWithRouterAndRedux(
      <AvatarContext.Provider value={{ state: {}, actions: {} }}>
        <UserProfile user={user} />
      </AvatarContext.Provider>,
      { initialState }
    );
    expect(getByText(/tier 0 user/i)).toBeVisible();
  });

  test.skip('renders Tier 1 when currentLevel is Tier_1 ', () => {
    user.currentLevel = 'Tier_1';
    const { getByText } = renderWithRouterAndRedux(
      <AvatarContext.Provider value={{ state: {}, actions: {} }}>
        <UserProfile user={user} />
      </AvatarContext.Provider>,
      { initialState }
    );

    expect(getByText(/tier 1 user/i)).toBeVisible();
  });

  test.skip('renders verified user when currentLevel is Tier_2', () => {
    user.currentLevel = 'Tier_2';
    const { getByText } = renderWithRouterAndRedux(
      <AvatarContext.Provider value={{ state: {}, actions: {} }}>
        <UserProfile user={user} />
      </AvatarContext.Provider>,
      { initialState }
    );

    expect(getByText(/verified user/i)).toBeVisible();
  });
});
