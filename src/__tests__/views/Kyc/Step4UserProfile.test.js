import React from 'react';

import { renderWithRouter } from '../../../helpers/tests.helpers';
import Step4UserProfile from '../../../views/Kyc/Step4UserProfile';

test('renders the component', () => {
  const { getByText } = renderWithRouter(
    <Step4UserProfile changeSteps={jest.fn()} />
  );

  expect(getByText(/verification process - step 4/i)).toBeInTheDocument();
  expect(getByText(/submit & continue/i)).toBeInTheDocument();
  expect(getByText(/verify later/i)).toBeInTheDocument();
});

test('renders the component', () => {
  const { getByLabelText } = renderWithRouter(
    <Step4UserProfile changeSteps={jest.fn()} />
  );

  expect(getByLabelText(/industry/i)).toBeInTheDocument();
});
