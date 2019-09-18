import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import AddContact from '../../../views/Contacts/AddContact';

test('renders the component', () => {
  const clickHandler = jest.fn();
  const { getByText } = render(<AddContact clickHandler={clickHandler} />);

  expect(getByText(/new contact/i)).toBeInTheDocument();
});

test('calls clickHandler on click', () => {
  const clickHandler = jest.fn();
  const { getByText } = render(<AddContact clickHandler={clickHandler} />);

  fireEvent.click(getByText(/new contact/i));

  expect(clickHandler).toHaveBeenCalledTimes(1);
});
