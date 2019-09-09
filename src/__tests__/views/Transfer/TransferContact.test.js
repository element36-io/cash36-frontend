import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import TransferContact from '../../../views/Transfer/TransferContact';
import { AvatarContext } from '../../../providers/avatar.provider';

const props = {
  contact: {
    avatarUrl: null,
    contactName: 'John',
    contactAddress: '0x89b5c95edf8aeca1366f83043e805aebe1992cce'
  },
  clickCallback: jest.fn()
};

test('renders the component', () => {
  const { getByText, getByTestId } = render(
    <AvatarContext.Provider value={{ state: {} }}>
      <TransferContact {...props} />
    </AvatarContext.Provider>
  );

  expect(getByText('John')).toBeInTheDocument();
  expect(getByTestId('avatar__icon')).toBeInTheDocument();
});

test('calls clickCallback when clicked', () => {
  const clickCallback = jest.fn();

  const { getByText } = render(
    <AvatarContext.Provider value={{ state: {} }}>
      <TransferContact {...props} clickCallback={clickCallback} />
    </AvatarContext.Provider>
  );

  fireEvent.click(getByText('John'));

  expect(clickCallback).toHaveBeenCalledTimes(1);
});
