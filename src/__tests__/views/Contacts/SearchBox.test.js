import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import SearchBox from '../../../views/Contacts/SearchBox';

const props = {
  changeHandler: jest.fn(),
  value: ''
};

test('renders the component', () => {
  const { getByRole } = render(<SearchBox {...props} />);

  expect(getByRole('textbox')).toBeInTheDocument();
});

test('calls changeHandler', () => {
  const changeHandler = jest.fn();
  const { getByRole } = render(
    <SearchBox {...props} changeHandler={changeHandler} />
  );

  const input = getByRole('textbox');

  fireEvent.input(input, { target: { value: 'text' } });

  expect(changeHandler).toHaveBeenCalledTimes(1);
});
