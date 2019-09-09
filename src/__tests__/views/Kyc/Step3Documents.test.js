import React from 'react';
import mockAxios from 'axios';
import { wait } from '@testing-library/react';

import { renderWithRouter } from '../../../helpers/tests.helpers';
import Step3Documents from '../../../views/Kyc/Step3Documents';

test('renders the component', async () => {
  const { getByText, getAllByText } = renderWithRouter(
    <Step3Documents changeSteps={jest.fn()} />
  );

  expect(getByText(/verification process - step 3/i)).toBeInTheDocument();
  expect(getByText(/submit & continue/i)).toBeInTheDocument();
  expect(getByText(/verify later/i)).toBeInTheDocument();
  expect(getAllByText(/upload a document or an image/i).length).toBe(4);
});

test('displays the selfie code', async () => {
  mockAxios.get.mockImplementation(() =>
    Promise.resolve({
      data: {
        result: 'krypto'
      }
    })
  );

  const { getByText } = renderWithRouter(
    <Step3Documents changeSteps={jest.fn()} />
  );

  await wait(() => expect(getByText(/krypto/i)).toBeInTheDocument());

  mockAxios.get.mockRestore();
});
