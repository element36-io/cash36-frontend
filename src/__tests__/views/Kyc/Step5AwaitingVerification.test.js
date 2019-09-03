import React from 'react';

import { renderWithRouter } from '../../../helpers/tests.helpers';
import Step5AwaitingVerification from '../../../views/Kyc/Step5AwaitingVerification';
import { fireEvent } from '@testing-library/react';

test('renders the component', () => {
  const { getByText } = renderWithRouter(<Step5AwaitingVerification />);

  expect(getByText(/verification process completed/i)).toBeInTheDocument();
  expect(getByText(/finish/i)).toBeInTheDocument();
});

test('redirects to / when finish button clicked', () => {
  const { getByText, history } = renderWithRouter(
    <Step5AwaitingVerification />,
    {
      route: '/kyc/caseId-1'
    }
  );

  const finishButton = getByText(/finish/i);

  expect(history.location.pathname).toBe('/kyc/caseId-1');

  fireEvent.click(finishButton);

  expect(history.location.pathname).toBe('/');
});
