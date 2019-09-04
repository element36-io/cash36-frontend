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

test('renders the exchangeFee', () => {
  const { getByText } = renderWithRedux(
    <SellTokens {...props} exchangeFee={1} />
  );

  expect(getByText(/exchange fee/i)).toBeInTheDocument();
});

test('doeenst render the exchangeFee nothing if exchangeFee is null', () => {
  const { queryByText } = renderWithRedux(<SellTokens {...props} />);

  expect(queryByText(/exchange fee/i)).toBeNull();
});
