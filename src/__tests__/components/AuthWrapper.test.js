import React from 'react';
import { render } from '@testing-library/react';

import AuthWrapper from '../../components/AuthWrapper';

test('renders the component', () => {
  const { getByTestId } = render(<AuthWrapper />);

  expect(getByTestId('auth__wrapper')).toBeVisible();
});
