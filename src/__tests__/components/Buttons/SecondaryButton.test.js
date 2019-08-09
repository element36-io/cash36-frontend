import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import SecondaryButton from '../../../components/Buttons/SecondaryButton';

const onClick = jest.fn();

test('renders the component with children', () => {
  const { getByText } = render(<SecondaryButton>submit</SecondaryButton>);

  expect(getByText('submit')).toBeVisible();
});

test('calls onClick on click', () => {
  const { getByTestId } = render(
    <SecondaryButton onClick={onClick}>submit</SecondaryButton>
  );

  fireEvent.click(getByTestId('secondary-button'));

  expect(onClick).toHaveBeenCalledTimes(1);
});
