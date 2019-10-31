import React from 'react';
import { fireEvent } from '@testing-library/react';

import { renderWithAvatarContext } from '../../../helpers/tests.helpers';
import TransferContact from '../../../views/Buy/TransferContact';

const props = {
  contact: {
    avatarUrl: null,
    contactName: 'John',
    contactAddress: '0x89b5c95edf8aeca1366f83043e805aebe1992cce'
  },
  clickCallback: jest.fn()
};

test('renders the component', () => {
  const { getByText, getByTestId } = renderWithAvatarContext(
    <TransferContact {...props} />
  );

  expect(getByText('John')).toBeInTheDocument();
  expect(getByTestId('avatar__icon')).toBeInTheDocument();
});

test('calls clickCallback when clicked', () => {
  const clickCallback = jest.fn();

  const { getByText } = renderWithAvatarContext(
    <TransferContact {...props} clickCallback={clickCallback} />
  );

  fireEvent.click(getByText('John'));

  expect(clickCallback).toHaveBeenCalledTimes(1);
});
