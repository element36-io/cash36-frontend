import React from 'react';
import { render } from '@testing-library/react';

import AppLinks from '../../../views/Login/AppLinks';

test('renders the component', () => {
  const { getByText, getByAltText } = render(<AppLinks />);

  expect(getByText(/need a uport account/i)).toBeInTheDocument();
  expect(getByAltText(/google-play-badge/i)).toBeInTheDocument();
  expect(getByAltText(/app-store-badge/i)).toBeInTheDocument();
});
