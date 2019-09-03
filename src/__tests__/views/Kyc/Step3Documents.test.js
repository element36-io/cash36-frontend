import React from 'react';

import { renderWithRouter } from '../../../helpers/tests.helpers';
import Step3Documents from '../../../views/Kyc/Step3Documents';

test('renders the component', () => {
  const { getByText, getAllByText } = renderWithRouter(
    <Step3Documents changeSteps={jest.fn()} />
  );

  expect(getByText(/verification process - step 3/i)).toBeInTheDocument();
  expect(getByText(/submit & continue/i)).toBeInTheDocument();
  expect(getByText(/verify later/i)).toBeInTheDocument();
  expect(getAllByText(/upload a document or an image/i).length).toBe(4);
});
