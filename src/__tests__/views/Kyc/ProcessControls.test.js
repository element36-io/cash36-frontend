import React from 'react';

import { renderWithRouter } from '../../../helpers/tests.helpers';
import ProcessControls from '../../../views/Kyc/ProcessControls';
import { fireEvent } from '@testing-library/react';

const props = {
  submitLabel: 'Submit',
  submitCallback: jest.fn(),
  error: null
};

test('renders the component', () => {
  const { getByText } = renderWithRouter(<ProcessControls {...props} />);

  expect(getByText(/verify later/i)).toBeInTheDocument();
  expect(getByText(/submit/i)).toBeInTheDocument();
});

test('returns to / on verify later click', () => {
  const { getByText, history } = renderWithRouter(
    <ProcessControls {...props} />,
    {
      route: '/kyc/start'
    }
  );

  expect(history.location.pathname).toBe('/kyc/start');

  const verifyLaterButton = getByText(/verify later/i);

  fireEvent.click(verifyLaterButton);

  expect(history.location.pathname).toBe('/');
});

test('calls submitCallback on click', () => {
  const submitCallback = jest.fn();
  const { getByText } = renderWithRouter(
    <ProcessControls {...props} submitCallback={submitCallback} />
  );

  const submitButton = getByText(/submit/i);

  fireEvent.click(submitButton);

  expect(submitCallback).toHaveBeenCalledTimes(1);
});

test('renders the error', () => {
  const error = 'error message';
  const { getByText } = renderWithRouter(
    <ProcessControls {...props} error={error} />
  );

  expect(getByText(error)).toBeInTheDocument();
});
