import React from 'react';
import { render } from '@testing-library/react';

import UnavailableBalance from '../../components/UnavailableBalance';

test('renders the component', () => {
  const { getByText } = render(<UnavailableBalance />);

  expect(getByText("You don't have enough Balance")).toBeVisible();
});
