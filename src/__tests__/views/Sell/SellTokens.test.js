import React from 'react';

import SellTokens from '../../../views/Sell/SellTokens';

import { renderWithRedux } from '../../../helpers/tests.helpers';

const props = {
  amount: '10',
  symbol: 'CHF36',
  handleChange: jest.fn(),
  onClick: jest.fn(),
  token: {
    balance: 100
  },
  tokensError: '',
  exchangeFeeError: null,
  exchangeFee: null
};

test('renders the component', () => {
  const { getByText } = renderWithRedux(<SellTokens {...props} />);

  expect(getByText(/sell tokens/i)).toBeInTheDocument();
  expect(getByText(/choose amount/i)).toBeInTheDocument();
  expect(getByText(/select token/i)).toBeInTheDocument();
  expect(getByText(/next step/i)).toBeInTheDocument();
});

test('renders the full exchangeFee if exchangeFee is > 0', () => {
  const { getByText } = renderWithRedux(
    <SellTokens {...props} exchangeFee={1} />
  );

  expect(getByText(/exchange fee/i)).toBeInTheDocument();
  expect(getByText(/1%/i)).toBeInTheDocument();
  expect(
    getByText(/amount that will be sent to your account/i)
  ).toBeInTheDocument();
  expect(getByText(/9.90/i)).toBeInTheDocument();
});

test('renders partial exchangeFee if exchangeFee is === 0', () => {
  const { queryByText, getByText } = renderWithRedux(
    <SellTokens {...props} exchangeFee={0} />
  );

  expect(
    getByText(/amount that will be sent to your account/i)
  ).toBeInTheDocument();
  expect(getByText(/10.00/i)).toBeInTheDocument();
  expect(queryByText(/1%/i)).toBeNull();
  expect(queryByText(/exchange fee/i)).toBeNull();
});

test("doesn't render the exchangeFee if exchangeFee is null", () => {
  const { queryByText } = renderWithRedux(<SellTokens {...props} />);

  expect(queryByText(/couldn't determine exchange fee/i)).toBeNull();
  expect(queryByText(/amount that will be sent to your account/i)).toBeNull();
});

test('renders a paragraph if exchangeFee is false', () => {
  const { getByText } = renderWithRedux(
    <SellTokens {...props} exchangeFee={false} />
  );

  expect(getByText(/couldn't determine exchange fee/i)).toBeInTheDocument();
});
