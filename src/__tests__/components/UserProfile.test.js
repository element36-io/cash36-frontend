import React from 'react';
import { renderWithRouter } from '../../helpers/tests.helpers';

import { UserProfile } from '../../components/UserProfile/UserProfile';
import { AvatarContext } from '../../providers/avatar.provider';

const renderWithAvatarContext = component => {
  return renderWithRouter(
    <AvatarContext.Provider value={{ state: {} }}>
      {component}
    </AvatarContext.Provider>
  );
};

const user = {
  username: '0x0000000000000000000000000000000000000001',
  name: 'John Doe',
  account: '0x0000000000000000000000000000000000000001',
  avatarUri: null,
  currentProcessStatus: 'START',
  caseId: '1'
};

describe('renders user profile', () => {
  test('renders the component', () => {
    const { getByTestId } = renderWithAvatarContext(
      <UserProfile user={user} />
    );

    expect(getByTestId('user-profile')).toBeVisible();
  });

  test('renders the avatar component', () => {
    const { getByTestId } = renderWithAvatarContext(
      <UserProfile user={user} />
    );

    expect(getByTestId('avatar__icon')).toBeVisible();
  });

  test("renders the user's name", () => {
    const { getByText } = renderWithAvatarContext(<UserProfile user={user} />);

    expect(getByText(user.name)).toBeVisible();
  });

  test('renders the username', () => {
    const { getByText } = renderWithAvatarContext(<UserProfile user={user} />);

    expect(getByText(`ID: ${user.username}`)).toBeVisible();
  });
});

describe('renders different tier levels', () => {
  test('renders Tier 0 when currentLevel is Tier_0', () => {
    user.currentLevel = 'Tier_0';
    const { getByText } = renderWithAvatarContext(<UserProfile user={user} />);
    expect(getByText(/tier 0 user/i)).toBeVisible();
  });

  test('renders Tier 0 when currentLevel is undefined', () => {
    const { getByText } = renderWithAvatarContext(<UserProfile user={user} />);
    expect(getByText(/tier 0 user/i)).toBeVisible();
  });

  test('renders Tier 1 when currentLevel is Tier_1 ', () => {
    user.currentLevel = 'Tier_1';
    const { getByText } = renderWithAvatarContext(<UserProfile user={user} />);

    expect(getByText(/tier 1 user/i)).toBeVisible();
  });

  test('renders verified user when currentLevel is Tier_2', () => {
    user.currentLevel = 'Tier_2';
    const { getByText } = renderWithAvatarContext(<UserProfile user={user} />);

    expect(getByText(/verified user/i)).toBeVisible();
  });
});
