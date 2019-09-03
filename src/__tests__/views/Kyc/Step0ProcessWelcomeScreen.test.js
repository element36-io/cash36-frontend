import React from 'react';

import { renderWithRouter } from '../../../helpers/tests.helpers';
import Step0ProcessWelcomeScreen from '../../../views/Kyc/Step0ProcessWelcomeScreen';

test('renders the component', () => {
  const { getByText } = renderWithRouter(
    <Step0ProcessWelcomeScreen startKycProcess={jest.fn()} />
  );

  expect(getByText(/welcome to element36/i)).toBeInTheDocument();
  expect(getByText(/start verification process/i)).toBeInTheDocument();
  expect(getByText(/verify later/i)).toBeInTheDocument();
});
