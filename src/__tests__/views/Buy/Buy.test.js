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

  test('renders the component with step 0', () => {
    const { getByText, getByPlaceholderText, getByLabelText } = component;

    expect(getByText(/buy tokens/i)).toBeInTheDocument();
    expect(getByText(/next step/i)).toBeInTheDocument();
    expect(getByText(/select token/i)).toBeInTheDocument();
    expect(getByLabelText(/choose amount/i)).toBeInTheDocument();
    expect(
      getByText(/buying cash36 tokens is as simple as a bank transfer/i)
    ).toBeInTheDocument();
    expect(getByPlaceholderText('TOKEN36').value).toBe('EUR36');
  });

  test('goes to step 1 then user updates amount and clicks on next step button', () => {
    const { getByText, getByLabelText } = component;

    const button = getByText(/next step/i);
    const amountInput = getByLabelText(/choose amount/i);

    fireEvent.change(amountInput, { target: { value: 23 } });
    fireEvent.click(button);

    expect(getByText(/payment method/i)).toBeInTheDocument();
    expect(getByText(/manual bank transfer/i)).toBeInTheDocument();
    expect(getByText(/automated bank transfer/i)).toBeInTheDocument();
    expect(
      getByText(/buying cash36 tokens is as simple as a bank transfer/i)
    ).toBeInTheDocument();
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

    const nextStepButton = component.getByText(/next step/i);
    const amountInput = component.getByLabelText(/choose amount/i);

    fireEvent.change(amountInput, { target: { value: 23 } });
    fireEvent.click(nextStepButton);
  });

  test('goes back to step 0 when back button is clicked', () => {
    const { getByTestId, getByText, getByLabelText } = component;

    const backButton = getByTestId('back-button');

    fireEvent.click(backButton);

    expect(getByText(/buy tokens/i)).toBeInTheDocument();
    expect(getByText(/next step/i)).toBeInTheDocument();
    expect(getByText(/select token/i)).toBeInTheDocument();
    expect(getByLabelText(/choose amount/i)).toBeInTheDocument();
  });

  test('goes to step 2.1 when manual transfer button is clicked with success', async () => {
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
    const { getByText } = component;

    const manualPaymentButton = getByText(/manual bank transfer/i);

    mockAxios.post.mockImplementationOnce(() => Promise.resolve({ data }));

    fireEvent.click(manualPaymentButton);

    await wait(() => {
      expect(getByText(/trigger your payment/i)).toBeInTheDocument();
      expect(getByText(/main street/i)).toBeInTheDocument();
      expect(getByText(/1000/i)).toBeInTheDocument();
      expect(getByText(/main bank/i)).toBeInTheDocument();
      expect(getByText(/chf/i)).toBeInTheDocument();
      expect(getByText(/ch0289144246976269165/i)).toBeInTheDocument();
      expect(getByText(/rs1289144246976269165/i)).toBeInTheDocument();
      expect(getByText(/element36/i)).toBeInTheDocument();
      expect(getByText(/go to account history/i)).toBeInTheDocument();
      expect(getByText(/back to homepage/i)).toBeInTheDocument();
      expect(getByText(/back to homepage/i)).toBeInTheDocument();
      expect(getByText(/iban ch0289144246976269165/i)).toBeInTheDocument();
    });

    mockAxios.post.mockRestore();
  });

  test('goes to step 2.1 when manual transfer button is clicked with error', async () => {
    const { getByText } = component;

    const manualPaymentButton = getByText(/manual bank transfer/i);

    // eslint-disable-next-line prefer-promise-reject-errors
    mockAxios.post.mockImplementationOnce(() => Promise.reject());

    fireEvent.click(manualPaymentButton);

    await wait(() => {
      expect(getByText(/buy unsuccessful/i)).toBeInTheDocument();
      expect(getByText(/user not enabled or verified/i)).toBeInTheDocument();
      expect(getByText(/go to account history/i)).toBeInTheDocument();
      expect(getByText(/back to homepage/i)).toBeInTheDocument();
    });

    mockAxios.post.mockRestore();
  });

  test('goes to 2.2 when automatic transfer button is clicked', () => {
    const { getByText } = component;

    const autoPaymentButton = getByText(/automated bank transfer/i);

    fireEvent.click(autoPaymentButton);

    expect(getByText(/initiate the payment/i)).toBeInTheDocument();
    expect(getByText(/submit order/i)).toBeInTheDocument();
  });
});
