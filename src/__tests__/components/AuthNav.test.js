import React from 'react';
import { renderWithRouter } from '../../helpers/tests.helpers';

import AuthNav from '../../components/AuthWrapper/AuthNav';

test('renders the component', () => {
  const { getByTestId } = renderWithRouter(<AuthNav />);

  expect(getByTestId('auth__nav')).toBeVisible();
});
