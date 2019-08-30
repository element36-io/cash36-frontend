import React from 'react';
import { render } from '@testing-library/react';

import DefaultButton from '../../../components/Buttons/DefaultButton';

test('renders the component with children', () => {
  const { getByText } = render(<DefaultButton>submit</DefaultButton>);

  expect(getByText('submit')).toBeVisible();
});

test('displays the spinner when submitting is true', () => {
  const { getByTestId } = render(<DefaultButton submitting />);

  expect(getByTestId('default-button__spinner')).toBeVisible();
});
