import React from 'react';

import { renderWithRouter } from '../../../helpers/tests.helpers';
import Step2BeneficialOwner from '../../../views/Kyc/Step2BeneficialOwner';
import { fireEvent } from '@testing-library/react';

test('renders the component', () => {
  const { getByText } = renderWithRouter(
    <Step2BeneficialOwner changeSteps={jest.fn()} />
  );

  expect(getByText(/verification process - step 2/i)).toBeInTheDocument();
  expect(getByText(/submit & continue/i)).toBeInTheDocument();
  expect(getByText(/verify later/i)).toBeInTheDocument();
});

test('checks the beneficial owner checkbox on click', () => {
  const { getByTestId } = renderWithRouter(
    <Step2BeneficialOwner changeSteps={jest.fn()} />
  );

  const checkbox = getByTestId('beneficial-owner__checkbox').querySelector(
    'input[type="checkbox"]'
  );

  expect(checkbox.checked).toBe(false);

  fireEvent.click(checkbox);

  expect(checkbox.checked).toBe(true);
});
