import React from 'react';
import { render } from '@testing-library/react';

import AddWalletDialog from '../../components/AddWalletDialog';

test('renders the component', () => {
  const { getByText } = render(<AddWalletDialog />);

  expect(getByText(/add wallet/i)).toBeInTheDocument();
});
