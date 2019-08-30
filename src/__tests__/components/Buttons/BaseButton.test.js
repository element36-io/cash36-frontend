import React from 'react';
import { render } from '@testing-library/react';

import BaseButton from '../../../components/Buttons/BaseButton';

test('renders the component with children', () => {
  const { getByText } = render(<BaseButton>submit</BaseButton>);

  expect(getByText('submit')).toBeVisible();
});
