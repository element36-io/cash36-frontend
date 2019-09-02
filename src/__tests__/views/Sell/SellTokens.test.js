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
  exchangeFee: 1
};

test('renders the component', () => {
  const { getByText } = renderWithRedux(<SellTokens {...props} />);

  expect(getByText(/sell tokens/i)).toBeInTheDocument();
  expect(getByText(/choose amount/i)).toBeInTheDocument();
  expect(getByText(/select token/i)).toBeInTheDocument();
  expect(getByText(/next step/i)).toBeInTheDocument();
});
