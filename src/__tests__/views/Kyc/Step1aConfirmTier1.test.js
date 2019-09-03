import React from 'react';

import { renderWithRouter } from '../../../helpers/tests.helpers';
import Step1aConfirmTier1 from '../../../views/Kyc/Step1aConfirmTier1';

test('renders the component', () => {
  const { getByText } = renderWithRouter(
    <Step1aConfirmTier1 changeSteps={jest.fn()} />
  );

  expect(getByText(/tier 1 reached/i)).toBeInTheDocument();
  expect(getByText(/continue verification process/i)).toBeInTheDocument();
  expect(getByText(/verify later/i)).toBeInTheDocument();
});
