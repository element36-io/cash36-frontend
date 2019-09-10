import React from 'react';

import {
  renderWithAvatarContext,
  renderWithRedux
} from '../../../helpers/tests.helpers';
import TransferAmount from '../../../views/Transfer/TransferAmount';
import { fireEvent, getByLabelText } from '@testing-library/react';

const props = {
  target: {
    avatarUrl: null,
    contactName: 'John',
    contactAddress: '0x89b5c95edf8aeca1366f83043e805aebe1992cce'
  },
  tokens: [
    {
      name: 'Swiss Franc',
      symbol: 'CHF36',
      balance: 10
    },
    {
      name: 'Euro',
      symbol: 'EUR36',
      balance: 10
    }
  ],
  submitCallback: jest.fn()
};

test('renders the component', () => {
  const { getByText } = renderWithAvatarContext(
    <TransferAmount {...props} />,
    renderWithRedux
  );

  expect(getByText(/sending to/i)).toBeInTheDocument();
  expect(getByText(props.target.contactAddress)).toBeInTheDocument();
  expect(getByText(/available balance: 10.00 eur36/i)).toBeInTheDocument();
  expect(getByText('Send')).toBeInTheDocument();
});

test('calls submitCallback when submitted', () => {
  const submitCallback = jest.fn();

  const { getByPlaceholderText, getByText } = renderWithAvatarContext(
    <TransferAmount {...props} submitCallback={submitCallback} />,
    renderWithRedux
  );

  const input = getByPlaceholderText('0');
  const button = getByText('Send');

  fireEvent.input(input, { target: { value: '10' } });

  fireEvent.click(button);

  expect(submitCallback).toHaveBeenCalledTimes(1);
});
