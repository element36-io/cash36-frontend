import React from 'react';
import { render } from '@testing-library/react';

import DefaultButton from '../../../components/Buttons/DefaultButton';

test('renders the component with children', () => {
  const { container, getByText } = render(
    <DefaultButton>children</DefaultButton>
  );

  expect(container.firstChild).toBeVisible();
  expect(getByText('children')).toBeVisible();
});

test('displays the spinner when submitting is true', () => {
  const { getByTestId } = render(<DefaultButton submitting />);

  expect(getByTestId('default-button__spinner')).toBeVisible();
});
