import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import ContactResponse from '../../../views/Contacts/ContactResponse';

const props = {
  onClick: jest.fn(),
  title: 'Success',
  btnText: 'click me',
  type: 'success'
};

test('renders the component', () => {
  const { getByText } = render(<ContactResponse {...props} />);

  expect(getByText(props.title)).toBeInTheDocument();
});

test('calls onClick when button is clicked', () => {
  const onClick = jest.fn();
  const { getByText } = render(
    <ContactResponse {...props} onClick={onClick} />
  );

  const button = getByText(props.btnText);

  fireEvent.click(button);

  expect(onClick).toHaveBeenCalledTimes(1);
});
