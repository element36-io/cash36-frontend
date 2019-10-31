import React from 'react';
import { fireEvent } from '@testing-library/react';

import { renderWithAvatarContextAndRouter } from '../../../helpers/tests.helpers';
import ContactItem from '../../../views/Contacts/ContactItem';

const props = {
  contact: {
    id: '1',
    avatarUrl: null,
    contactName: 'John Doe',
    contactAddress: '0x89b5c95edf8aeca1366f83043e805aebe1992cce'
  },
  removeCallback: jest.fn(),
  quickTransfer: jest.fn()
};

test('renders the component', () => {
  const { getByText } = renderWithAvatarContextAndRouter(
    <ContactItem {...props} />
  );

  expect(getByText('John Doe')).toBeInTheDocument();
  expect(
    getByText('0x89b5c95edf8aeca1366f83043e805aebe1992cce')
  ).toBeInTheDocument();
});

test('changes route on click', () => {
  const quickTransfer = jest.fn();
  const { getByText, history } = renderWithAvatarContextAndRouter(
    <ContactItem {...props} quickTransfer={quickTransfer} />
  );

  const quickTransferButton = getByText(/transfer/i);

  expect(history.location.pathname).toBe('/');
  fireEvent.click(quickTransferButton);
  expect(history.location.pathname).toBe('/buy');
});

test('calls removeCallback on click', () => {
  const removeCallback = jest.fn();
  const { getByText, getByTestId } = renderWithAvatarContextAndRouter(
    <ContactItem {...props} removeCallback={removeCallback} />
  );

  const menuButton = getByTestId('contact__item__menu-button');

  menuButton.click();

  expect(getByText(/remove/i)).toBeInTheDocument();

  const removeButton = getByText(/remove/i);

  removeButton.click();

  expect(removeCallback).toHaveBeenCalledTimes(1);
});
