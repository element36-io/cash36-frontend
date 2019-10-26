import React from 'react';
import { Context as ResponsiveContext } from 'react-responsive';
import { BrowserRouter } from 'react-router-dom';
import mockAxios from 'axios';

import { renderWithRedux } from '../../../helpers/tests.helpers';
import { Buy } from '../../../views/Buy/Buy';
import { fireEvent, wait } from '@testing-library/react';

const initialState = {
  tokens: [
    {
      name: 'Swiss Franc',
      symbol: 'CHF36'
    },
    {
      name: 'Euro',
      symbol: 'EUR36'
    }
  ]
};

describe('step 0', () => {
  let component;

  beforeEach(() => {
    component = renderWithRedux(
      <ResponsiveContext.Provider value={{ width: 1200 }}>
        <Buy getTokens={jest.fn()} />
      </ResponsiveContext.Provider>,
      { initialState }
    );
  });

  test('renders the component', () => {
    const { getByTestId } = component;

    expect(getByTestId('buy-step0')).toBeInTheDocument();
  });

  test('goes to step 1 when clicked on Send to your Wallet ', () => {
    const { getByText, getByTestId } = component;

    fireEvent.click(getByText(/send to your wallet/i));

    expect(getByTestId('buy-tokens')).toBeInTheDocument();
  });

  test('goes to step 2.1 when clicked on Send to an address', () => {
    const { getByText, getByTestId } = component;

    fireEvent.click(getByText(/send to an address/i));

    expect(getByTestId('buy__choose-address')).toBeInTheDocument();
  });
});

describe('step 1', () => {
  let component;

  beforeEach(() => {
    component = renderWithRedux(
      <ResponsiveContext.Provider value={{ width: 1200 }}>
        <BrowserRouter>
          <Buy getTokens={jest.fn()} />
        </BrowserRouter>
      </ResponsiveContext.Provider>,
      { initialState }
    );

    fireEvent.click(component.getByText(/send to your wallet/i));

    const nextStepButton = component.getByText(/next step/i);
    const amountInput = component.getByLabelText(/choose amount/i);

    fireEvent.change(amountInput, { target: { value: 23 } });
    fireEvent.click(nextStepButton);
  });

  test('goes back to step 0 when back button is clicked', () => {
    const { getByTestId } = component;

    const backButton = getByTestId('back-button');

    fireEvent.click(backButton);

    expect(getByTestId('buy-step0')).toBeInTheDocument();
  });

  test('goes to step 3 when data is entered', () => {
    const { getByTestId } = component;

    expect(getByTestId('payment-method')).toBeInTheDocument();
  });

  test('goes to step 4.1 when manual transfer button is clicked with success', async () => {
    const data = {
      amount: 1,
      bankAddress: 'Main Street',
      bankBic: '1000',
      bankCountry: 'Switzerland',
      bankCountryCode: 'CH',
      bankName: 'Main Bank',
      currency: 'CHF',
      paymentReferenceId: '1',
      receipientAddress: 'Bahnmatt 25, 6340 Baar',
      receipientIban: 'RS1289144246976269165',
      receipientName: 'element36',
      userIban: 'CH0289144246976269165'
    };
    const { getByText, getByTestId } = component;

    const manualPaymentButton = getByText(/manual bank transfer/i);

    mockAxios.post.mockImplementationOnce(() => Promise.resolve({ data }));

    fireEvent.click(manualPaymentButton);

    await wait(() => {
      expect(getByTestId('payment-info')).toBeInTheDocument();
    });

    mockAxios.post.mockRestore();
  });

  test('goes to step 5 when manual transfer button is clicked with error', async () => {
    const { getByText, getByTestId } = component;

    const manualPaymentButton = getByText(/manual bank transfer/i);

    // eslint-disable-next-line prefer-promise-reject-errors
    mockAxios.post.mockImplementationOnce(() => Promise.reject());

    fireEvent.click(manualPaymentButton);

    await wait(() => {
      expect(getByTestId('buy-error')).toBeInTheDocument();
    });

    mockAxios.post.mockRestore();
  });

  test('goes to 4.2 when automatic transfer button is clicked', () => {
    const { getByText } = component;

    const autoPaymentButton = getByText(/automated bank transfer/i);

    fireEvent.click(autoPaymentButton);

    expect(getByText(/initiate the payment/i)).toBeInTheDocument();
    expect(getByText(/submit order/i)).toBeInTheDocument();
  });
});
