import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import ArrowButton from '../../../views/Buy/ArrowButton';

test('renders the component', () => {
  const { getByTestId } = render(<ArrowButton />);

  expect(getByTestId('arrow-button')).toBeInTheDocument();
});

test('calls onClick when clicked', () => {
  const onClick = jest.fn();
  const { getByTestId } = render(<ArrowButton onClick={onClick} />);

  const button = getByTestId('arrow-button');

  fireEvent.click(button);

  expect(onClick).toHaveBeenCalledTimes(1);
});
