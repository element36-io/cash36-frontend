import React from 'react';

import { renderWithRedux } from '../../helpers/tests.helpers';

import PageLoader from '../../components/PageLoader';

test('renders the component', () => {
  const { getByTestId } = renderWithRedux(<PageLoader />);

  expect(getByTestId('page-loader')).toBeVisible();
});
