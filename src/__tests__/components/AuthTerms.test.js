import React from 'react';
import { render } from '@testing-library/react';

import AuthTerms from '../../components/AuthWrapper/AuthTerms';

test('renders the component', () => {
  const { getByText } = render(<AuthTerms />);

  expect(
    getByText('element36 Terms and Conditions & Privacy Policy')
  ).toBeInTheDocument();
});
