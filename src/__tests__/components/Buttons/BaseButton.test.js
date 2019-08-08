import React from 'react';
import { render } from '@testing-library/react';

import BaseButton from '../../../components/Buttons/BaseButton';

test('renders the component with children', () => {
  const { container, getByText } = render(<BaseButton>children</BaseButton>);

  expect(container.firstChild).toBeVisible();
  expect(getByText('children')).toBeVisible();
});
