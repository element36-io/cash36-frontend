import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import BackButton from '../../../components/Buttons/BackButton';

const onClick = jest.fn();

test('renders the component', () => {
  const { getByTestId } = render(<BackButton onClick={onClick} />);

  expect(getByTestId('back-button')).toBeVisible();
});

test('calls onClick on click', () => {
  const { getByTestId } = render(<BackButton onClick={onClick} />);

  fireEvent.click(getByTestId('back-button'));

  expect(onClick).toHaveBeenCalledTimes(1);
});

test('renders an arrow icon', () => {
  const { getByTestId } = render(<BackButton onClick={onClick} />);

  expect(getByTestId('back-button__arrow')).toBeVisible();
});
