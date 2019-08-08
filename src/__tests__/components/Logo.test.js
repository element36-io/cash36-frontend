import React from 'react';
import { render } from '@testing-library/react';

import Logo from '../../components/Logo';

test('renders the component with the image tag', () => {
  const { container, getByAltText } = render(<Logo />);

  expect(container.firstChild).toBeVisible();
  expect(getByAltText('LOGO')).toBeVisible();
});
