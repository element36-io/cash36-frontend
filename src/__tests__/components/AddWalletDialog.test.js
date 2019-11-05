import React from 'react';
import { render } from '@testing-library/react';
import { renderWithAvatarContextAndRouter } from '../../helpers/tests.helpers';

import AddWalletButton from '../../components/AddWalletButton';

test('renders the component', () => {
  const { getByText } = renderWithAvatarContextAndRouter(<AddWalletButton />);

  expect(getByText(/add wallet/i)).toBeInTheDocument();
});
