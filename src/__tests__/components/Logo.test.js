import React from 'react';
import { render } from '@testing-library/react';

import Logo from '../../components/Logo';

test('renders the component with the image tag', () => {
  const { getByAltText } = render(<Logo />);

  expect(getByAltText('LOGO')).toBeVisible();
});
