import React from 'react';

import { renderWithRedux } from '../../../helpers/tests.helpers';
import BuyTokens from '../../../views/Buy/BuyTokens';
import { fireEvent } from '@testing-library/react';

const props = {
  nextStep: jest.fn(),
  handleChange: jest.fn(),
  amount: '',
  symbol: 'CHF36'
};

test('renders the component', () => {
  const { getByText, getByLabelText } = renderWithRedux(
    <BuyTokens {...props} />
  );

  expect(getByText(/buy tokens/i)).toBeInTheDocument();
  expect(getByText(/next step/i)).toBeInTheDocument();
  expect(getByText(/choose amount/i)).toBeInTheDocument();
  expect(getByLabelText(/choose amount/i)).toBeInTheDocument();
  expect(getByLabelText(/select token/i)).toBeInTheDocument();
});

test('calls nextStep when amount and symbol supplied', () => {
  const nextStep = jest.fn();
  const { getByText } = renderWithRedux(
    <BuyTokens {...props} amount={'1'} nextStep={nextStep} />
  );

  fireEvent.click(getByText(/next step/i));

  expect(nextStep).toHaveBeenCalledTimes(1);
});

test("doesn't call nextStep when amount is empty", () => {
  const nextStep = jest.fn();

  const { getByText } = renderWithRedux(
    <BuyTokens {...props} nextStep={nextStep} />
  );

  fireEvent.click(getByText(/next step/i));

  expect(nextStep).not.toHaveBeenCalled();
});
