import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import { renderWithRouter } from '../../helpers/tests.helpers';

import VerificationButton from '../../components/UserProfile/VerificationButton';

const caseId = 'E36-1';

describe('renders the component properly', () => {
  test('renders nothing if currentProcessStatus is CLOSED', () => {
    const { queryByTestId } = render(
      <VerificationButton caseId={caseId} currentProcessStatus={'CLOSED'} />
    );

    expect(queryByTestId('verification-button')).toBeNull();
  });

  test('renders the button with VERIFY ACCOUNT if currentProcessStatus is NOT_STARTED', () => {
    const { getByText } = renderWithRouter(
      <VerificationButton
        caseId={caseId}
        currentProcessStatus={'NOT_STARTED'}
      />
    );

    expect(getByText('Verify Account')).toBeVisible();
  });

  test('renders the button with CONTINUE VERIFICATION', () => {
    const { getByText } = renderWithRouter(
      <VerificationButton caseId={caseId} currentProcessStatus={'STARTED'} />
    );

    expect(getByText('Continue Verification')).toBeVisible();
  });

  test('renders AWAITING VERIFICATION button if currentProcessStatus is AWAITING_VERIFICATION', () => {
    const { getByText } = renderWithRouter(
      <VerificationButton
        caseId={caseId}
        currentProcessStatus={'AWAITING_VERIFICATION'}
      />
    );

    expect(getByText('Awaiting Verification')).toBeVisible();
  });
});

describe('redirects to proper pages on button click', () => {
  test('redirects to /start if currentProcessStatus is NOT_STARTED', () => {
    const { getByText, history } = renderWithRouter(
      <VerificationButton
        caseId={caseId}
        currentProcessStatus={'NOT_STARTED'}
      />
    );

    expect(history.location.pathname).toBe('/');

    fireEvent.click(getByText('Verify Account'));

    expect(history.location.pathname).toBe('/kyc/start');
  });

  test('redirects to /case-id if kyc process started', () => {
    const { getByText, history } = renderWithRouter(
      <VerificationButton caseId={caseId} currentProcessStatus={'STARTED'} />
    );

    expect(history.location.pathname).toBe('/');

    fireEvent.click(getByText('Continue Verification'));

    expect(history.location.pathname).toBe(`/kyc/${caseId}`);
  });
});
