import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import LoginField from '../../../views/Login/LoginField';

const props = {
  value: '',
  changeHandler: jest.fn(),
  label: 'label',
  text: ''
};

test('renders the component', () => {
  const { getByLabelText } = render(<LoginField {...props} />);

  expect(getByLabelText('label')).toBeInTheDocument();
});

test('fires changeHandler', () => {
  const changeHandler = jest.fn();
  const { getByLabelText } = render(
    <LoginField {...props} changeHandler={changeHandler} />
  );

  fireEvent.change(getByLabelText('label'), { target: { value: '1' } });

  expect(changeHandler).toHaveBeenCalledTimes(1);
});
