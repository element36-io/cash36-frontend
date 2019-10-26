import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import BuyStep0 from '../../../views/Buy/BuyStep0';

test('renders the component', () => {
  const { getByTestId } = render(<BuyStep0 setStep={jest.fn()} />);

  expect(getByTestId('buy-step0')).toBeInTheDocument();
});

test('calls setStep', () => {
  const setStep = jest.fn();
  const { getByText } = render(<BuyStep0 setStep={setStep} />);

  fireEvent.click(getByText(/send to your wallet/i));

  expect(setStep).toHaveBeenCalledTimes(1);
});
