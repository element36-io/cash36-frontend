import React from 'react';
import { render } from '@testing-library/react';

import ChooseTypeOfWallet from '../../components/ChooseTypeOfWallet';

test('renders the component', () => {
  const { getByText } = render(<ChooseTypeOfWallet />);

  expect(getByText(/uport/i)).toBeInTheDocument();
  expect(getByText(/metamask/i)).toBeInTheDocument();
});
