import React from 'react';
import { fireEvent } from '@testing-library/react';

import { renderWithRedux } from '../../../helpers/tests.helpers';

import BuyStep0 from '../../../views/Buy/BuyStep0';

test('renders the component', () => {
  const initialState = {
    wallets: {
      walletList: []
    }
  };

  const { getByTestId } = renderWithRedux(
    <BuyStep0 setStep={jest.fn()} />,
    initialState
  );

  expect(getByTestId('buy-step0')).toBeInTheDocument();
});

test('doesnt call setStep if there are no wallets', () => {
  const initialState = {
    wallets: {
      walletList: []
    }
  };

  const setStep = jest.fn();
  const { getByText } = renderWithRedux(<BuyStep0 setStep={setStep} />, {
    initialState
  });

  fireEvent.click(getByText(/send to your wallet/i));

  expect(setStep).toHaveBeenCalledTimes(0);
});

test('calls setStep', () => {
  const initialState = {
    wallets: {
      walletList: ['1']
    }
  };

  const setStep = jest.fn();
  const { getByText } = renderWithRedux(
    <BuyStep0 setStep={setStep} hasWallet />,
    { initialState }
  );

  fireEvent.click(getByText(/send to your wallet/i));

  expect(setStep).toHaveBeenCalledTimes(1);
});
