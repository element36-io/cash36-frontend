import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import ContactsForm from '../../../views/Contacts/ContactsForm';

const props = {
  onSubmit: jest.fn(),
  changeHandler: jest.fn(),
  contactAddress: '',
  contactName: '',
  isValid: false,
  submitting: false
};

test('renders the component', () => {
  const { getByText } = render(<ContactsForm {...props} />);

  expect(getByText(/add contact/i)).toBeInTheDocument();
});

test('calls changeHandler', () => {
  const changeHandler = jest.fn();
  const { getByLabelText } = render(
    <ContactsForm {...props} changeHandler={changeHandler} />
  );

  const fullNameInput = getByLabelText('Full Name');

  fireEvent.input(fullNameInput, { target: { value: 'John Doe' } });

  expect(changeHandler).toHaveBeenCalledTimes(1);
});
