import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import SecondaryButton from '../../../components/Buttons/SecondaryButton';

const onClick = jest.fn();

test('renders the component with children', () => {
  const { container, getByText } = render(
    <SecondaryButton>children</SecondaryButton>
  );

  expect(container.firstChild).toBeVisible();
  expect(getByText('children')).toBeVisible();
});

test('calls onClick on click', () => {
  const { getByTestId } = render(
    <SecondaryButton onClick={onClick}>children</SecondaryButton>
  );

  fireEvent.click(getByTestId('secondary-button'));

  expect(onClick).toHaveBeenCalledTimes(1);
});
