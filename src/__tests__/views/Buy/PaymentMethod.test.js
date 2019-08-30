import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Context as ResponsiveContext } from 'react-responsive';

import PaymentMethod from '../../../views/Buy/PaymentMethod';

test('renders the component for large screens', () => {
  const { getByText } = render(
    <ResponsiveContext.Provider value={{ width: 1200 }}>
      <PaymentMethod />
    </ResponsiveContext.Provider>
  );

  expect(getByText(/select your payment method/i)).toBeInTheDocument();
  expect(getByText(/manual bank transfer/i)).toBeInTheDocument();
  expect(getByText(/automated bank transfer/i)).toBeInTheDocument();
});

test('renders the component for mobile screens', () => {
  const { getByText } = render(
    <ResponsiveContext.Provider value={{ width: 600 }}>
      <PaymentMethod />
    </ResponsiveContext.Provider>
  );

  expect(getByText(/payment method/i)).toBeInTheDocument();
  expect(getByText(/manual bank transfer/i)).toBeInTheDocument();
  expect(getByText(/automated bank transfer/i)).toBeInTheDocument();
});

test('calls handleManualTransferClick on click', () => {
  const handleManualTransferClick = jest.fn();

  const { getByText } = render(
    <ResponsiveContext.Provider value={{ width: 600 }}>
      <PaymentMethod handleManualTransferClick={handleManualTransferClick} />
    </ResponsiveContext.Provider>
  );

  const manualTransferButton = getByText(/manual bank transfer/i);

  fireEvent.click(manualTransferButton);

  expect(handleManualTransferClick).toHaveBeenCalledTimes(1);
});

test('calls handleAutoTransferClick on click', () => {
  const handleAutoTransferClick = jest.fn();

  const { getByText } = render(
    <ResponsiveContext.Provider value={{ width: 600 }}>
      <PaymentMethod handleAutoTransferClick={handleAutoTransferClick} />
    </ResponsiveContext.Provider>
  );

  const autoTransferButton = getByText(/automated bank transfer/i);

  fireEvent.click(autoTransferButton);

  expect(handleAutoTransferClick).toHaveBeenCalledTimes(1);
});
