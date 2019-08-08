import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import NavButton from '../../components/NavButton';

const props = {
  clickHandler: jest.fn(),
  isActive: false,
  alt: false
};

test('renders the component', () => {
  const { container } = render(<NavButton {...props} />);

  expect(container.firstChild).toBeVisible();
});

test('calls clickHandler on click', () => {
  const clickHandler = jest.fn();
  const { getByTestId } = render(
    <NavButton {...props} clickHandler={clickHandler} />
  );

  fireEvent.click(getByTestId('nav-button'));

  expect(clickHandler).toHaveBeenCalled();
});
