import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import ChooseAddress from '../../../views/Buy/ChooseAddress';

const props = {
  setStep: jest.fn(),
  handleChange: jest.fn(),
  address: ''
};

test('renders the component', () => {
  const { getByTestId } = render(<ChooseAddress {...props} />);

  expect(getByTestId('buy__choose-address')).toBeInTheDocument();
});

test('calls setStep on click', () => {
  const setStep = jest.fn();

  const { getByText } = render(
    <ChooseAddress {...props} setStep={setStep} address="0x000000000000001" />
  );

  fireEvent.click(getByText(/next step/i));

  expect(setStep).toHaveBeenCalledTimes(1);
});

test('doesnt call setStep if input is not filled', () => {
  const setStep = jest.fn();

  const { getByText } = render(<ChooseAddress {...props} setStep={setStep} />);

  fireEvent.click(getByText(/next step/i));

  expect(setStep).toHaveBeenCalledTimes(0);
});

test('calls handleChange on input change', () => {
  const handleChange = jest.fn();

  const { getByPlaceholderText } = render(
    <ChooseAddress {...props} handleChange={handleChange} />
  );

  fireEvent.change(getByPlaceholderText(/address/i), {
    target: { value: '10' }
  });

  expect(handleChange).toHaveBeenCalledTimes(1);
});
