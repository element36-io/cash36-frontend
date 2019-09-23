import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import ContactsInput from '../../../views/Contacts/ContactsInput';

const props = {
  label: 'contacts-input',
  placeholder: 'placeholder',
  value: 'value',
  name: 'name',
  changeHandler: jest.fn()
};

test('renders the component', () => {
  const { getByLabelText } = render(<ContactsInput {...props} />);

  expect(getByLabelText('contacts-input')).toBeInTheDocument();
});

test('calls changeHandler', () => {
  const changeHandler = jest.fn();
  const { getByLabelText } = render(
    <ContactsInput {...props} changeHandler={changeHandler} />
  );

  const input = getByLabelText('contacts-input');

  fireEvent.change(input, { target: { value: 'text' } });

  expect(changeHandler).toHaveBeenCalledTimes(1);
});
