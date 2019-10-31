import React from 'react';

import { renderWithAvatarContext } from '../../../helpers/tests.helpers';
import TransferSuggestions from '../../../views/Buy/TransferSuggestions';
import { fireEvent } from '@testing-library/react';

const props = {
  filter: '',
  contacts: [
    {
      id: '1',
      avatarUrl: null,
      contactAddress: '0x89b5c95edf8aeca1366f83043e805aebe1992ccb',
      contactName: 'John'
    },
    {
      id: '2',
      avatarUrl: null,
      contactAddress: '0x89b5c95edf8aeca1366f83043e805aebe1992cca',
      contactName: 'Jane'
    }
  ],
  onClick: jest.fn()
};

test('renders the components', () => {
  const { getByText } = renderWithAvatarContext(
    <TransferSuggestions {...props} />
  );

  expect(getByText(/john/i)).toBeInTheDocument();
  expect(getByText(/jane/i)).toBeInTheDocument();
});

test('calls onClick when clicked', () => {
  const onClick = jest.fn();
  const { getByText } = renderWithAvatarContext(
    <TransferSuggestions {...props} onClick={onClick} />
  );

  fireEvent.click(getByText(/john/i));

  expect(onClick).toHaveBeenCalledTimes(1);
});

test('filters the suggestion list if filter supplied', () => {
  const filter = 'Jane';
  const { queryByText } = renderWithAvatarContext(
    <TransferSuggestions {...props} filter={filter} />
  );

  expect(queryByText(/john/i)).not.toBeInTheDocument();
  expect(queryByText(/jane/i)).toBeInTheDocument();
});

test('renders nothing if contacts list is empty', () => {
  const contacts = [];
  const { queryByTestId } = renderWithAvatarContext(
    <TransferSuggestions {...props} contacts={contacts} />
  );

  expect(queryByTestId('transfer-suggestions')).toBeNull();
});
