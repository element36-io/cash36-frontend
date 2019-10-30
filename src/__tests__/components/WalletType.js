import React from 'react';
import { render } from '@testing-library/react';

import WalletType from '../../components/WalletType';

test('renders the component', () => {
  const { getByText } = render(<WalletType />);

  expect(getByText(/uport/i)).toBeInTheDocument();
  expect(getByText(/metamask/i)).toBeInTheDocument();
});
