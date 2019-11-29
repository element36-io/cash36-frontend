import React from 'react';
import { renderWithRouter } from '../../helpers/tests.helpers';

import AuthSidebar from '../../components/AuthWrapper/AuthSidebar';

test('renders the component', () => {
  const { getByTestId } = renderWithRouter(<AuthSidebar />);

  expect(getByTestId('auth__sidebar')).toBeVisible();
});
