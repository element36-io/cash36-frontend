import React from 'react';
import { render } from '@testing-library/react';

import CopyToClipboard from '../../components/CopyToClipboard';

test('renders the component', () => {
  const { getByTestId } = render(<CopyToClipboard />);

  expect(getByTestId('copy-to-clipboard')).toBeInTheDocument();
});
