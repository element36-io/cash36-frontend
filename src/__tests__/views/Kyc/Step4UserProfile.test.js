import React from 'react';

import { renderWithRouter } from '../../../helpers/tests.helpers';
import Step4UserProfile from '../../../views/Kyc/Step4UserProfile';
import { fireEvent } from '@testing-library/react';

test('renders the component', () => {
  const { getByText } = renderWithRouter(
    <Step4UserProfile changeSteps={jest.fn()} />
  );

  expect(getByText(/verification process - step 4/i)).toBeInTheDocument();
  expect(getByText(/submit & continue/i)).toBeInTheDocument();
  expect(getByText(/verify later/i)).toBeInTheDocument();
});

test('updates the correct profession value', () => {
  const { getByLabelText } = renderWithRouter(
    <Step4UserProfile changeSteps={jest.fn()} />
  );

  const professionInput = getByLabelText(/profession/i);

  expect(professionInput.value).toBe('');

  fireEvent.change(professionInput, { target: { value: 'teacher' } });

  expect(professionInput.value).toBe('teacher');
});

test('radio buttons', () => {
  const { getByLabelText } = renderWithRouter(
    <Step4UserProfile changeSteps={jest.fn()} />
  );

  const radioInput1 = getByLabelText('< 50.000 CHF/EUR');
  const radioInput2 = getByLabelText('> 200.000 CHF/EUR');

  expect(radioInput1.checked).toBe(false);
  expect(radioInput2.checked).toBe(false);

  fireEvent.click(radioInput1);

  expect(radioInput1.checked).toBe(true);
  expect(radioInput2.checked).toBe(false);

  fireEvent.click(radioInput2);

  expect(radioInput1.checked).toBe(false);
  expect(radioInput2.checked).toBe(true);
});

test('source of funds', () => {
  const { getByLabelText } = renderWithRouter(
    <Step4UserProfile changeSteps={jest.fn()} />
  );

  const checkboxInput = getByLabelText('Savings from Work');

  expect(checkboxInput.checked).toBe(false);

  fireEvent.click(checkboxInput);

  expect(checkboxInput.checked).toBe(true);
});
