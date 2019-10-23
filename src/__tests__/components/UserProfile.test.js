import React from 'react';

import { UserProfile } from '../../components/UserProfile/UserProfile';
import {
  renderWithAvatarContext,
  renderWithRouter
} from '../../helpers/tests.helpers';

const user = {
  username: 'test@example.com',
  name: 'John Doe',
  account: 'test@example.com',
  avatarUri: null,
  currentProcessStatus: 'START',
  caseId: '1'
};

describe('renders user profile', () => {
  test('renders the component', () => {
    const { getByTestId } = renderWithAvatarContext(
      <UserProfile user={user} />,
      renderWithRouter
    );

    expect(getByTestId('user-profile')).toBeVisible();
  });

  test('renders the avatar component', () => {
    const { getByTestId } = renderWithAvatarContext(
      <UserProfile user={user} />,
      renderWithRouter
    );

    expect(getByTestId('avatar__icon')).toBeVisible();
  });

  test("renders the user's name", () => {
    const { getByText } = renderWithAvatarContext(
      <UserProfile user={user} />,
      renderWithRouter
    );

    expect(getByText(user.name)).toBeVisible();
  });

  test('renders the username', () => {
    const { getByText } = renderWithAvatarContext(
      <UserProfile user={user} />,
      renderWithRouter
    );

    expect(getByText(`ID: ${user.username}`)).toBeVisible();
  });

  test('renders the user badge', () => {
    const { getByTestId } = renderWithAvatarContext(
      <UserProfile user={user} />,
      renderWithRouter
    );

    expect(getByTestId('tier-badge')).toBeVisible();
  });
});

describe('renders different tier levels', () => {
  test('renders Tier 0 when currentLevel is Tier_0', () => {
    user.currentLevel = 'Tier_0';
    const { getByText } = renderWithAvatarContext(
      <UserProfile user={user} />,
      renderWithRouter
    );
    expect(getByText(/tier 0 user/i)).toBeVisible();
  });

  test('renders Tier 0 when currentLevel is undefined', () => {
    const { getByText } = renderWithAvatarContext(
      <UserProfile user={user} />,
      renderWithRouter
    );
    expect(getByText(/tier 0 user/i)).toBeVisible();
  });

  test('renders Tier 1 when currentLevel is Tier_1 ', () => {
    user.currentLevel = 'Tier_1';
    const { getByText } = renderWithAvatarContext(
      <UserProfile user={user} />,
      renderWithRouter
    );

    expect(getByText(/tier 1 user/i)).toBeVisible();
  });

  test('renders verified user when currentLevel is Tier_2', () => {
    user.currentLevel = 'Tier_2';
    const { getByText } = renderWithAvatarContext(
      <UserProfile user={user} />,
      renderWithRouter
    );

    expect(getByText(/verified user/i)).toBeVisible();
  });
});
