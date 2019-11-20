import React from 'react';
import { render } from '@testing-library/react';

import Avatar from '../../components/Avatar';

test('renders the component', () => {
  const { container } = render(<Avatar />);

  expect(container.firstChild).toBeVisible();
});
