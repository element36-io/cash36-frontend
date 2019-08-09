import React from 'react';
import { render } from '@testing-library/react';

import Avatar from '../../components/Avatar';
import { AvatarContext } from '../../providers/avatar.provider';
import * as imageHelpers from '../../helpers/image.helpers';

test('renders the component', () => {
  const { container } = render(
    <AvatarContext.Provider
      value={{
        state: {},
        actions: {}
      }}
    >
      <Avatar />
    </AvatarContext.Provider>
  );

  expect(container.firstChild).toBeVisible();
});

test('renders an avatar if url is present in the context', () => {
  const username = '0x0000000000000000000000000000000000000001';
  const { getByAltText } = render(
    <AvatarContext.Provider
      value={{
        state: {
          '0x0000000000000000000000000000000000000001': 'avatarUrl'
        },
        actions: {}
      }}
    >
      <Avatar alt={'altText'} username={username} />
    </AvatarContext.Provider>
  );

  expect(getByAltText('altText')).toBeVisible();
});

test('renders an icon if avatarUrl and context url is not present', () => {
  const { getByTestId } = render(
    <AvatarContext.Provider
      value={{
        state: {},
        actions: {}
      }}
    >
      <Avatar alt={'altText'} />
    </AvatarContext.Provider>
  );

  expect(getByTestId('avatar__icon')).toBeVisible();
});

test('calls fetchImage if no context url and avatar is present', async () => {
  const username = '0x0000000000000000000000000000000000000001';
  const avatarUrl = 'avatarUrl';

  const addMock = jest.fn();
  const checkImageMock = jest.spyOn(imageHelpers, 'checkIfUrlContainsImage');

  render(
    <AvatarContext.Provider
      value={{
        state: {},
        actions: {
          add: addMock()
        }
      }}
    >
      <Avatar alt={'altText'} avatarUrl={avatarUrl} username={username} />
    </AvatarContext.Provider>
  );

  expect(addMock).toHaveBeenCalledTimes(1);
  expect(checkImageMock).toHaveBeenCalledTimes(1);
  expect(checkImageMock).toHaveBeenCalledWith(avatarUrl);
});
