import React from 'react';
import { Context as ResponsiveContext } from 'react-responsive';

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

test('renders the component with step 0', () => {
  const { getByText, getByPlaceholderText, getByLabelText } = renderWithRedux(
    <Buy getTokens={jest.fn()} />,
    { initialState }
  );

  expect(getByText(/buy tokens/i)).toBeInTheDocument();
  expect(getByText(/next step/i)).toBeInTheDocument();
  expect(getByText(/select token/i)).toBeInTheDocument();
  expect(getByLabelText(/choose amount/i)).toBeInTheDocument();
  expect(
    getByText(/buying cash36 tokens is as simple as a bank transfer/i)
  ).toBeInTheDocument();
  expect(getByPlaceholderText('TOKEN36').value).toBe('EUR36');
});

test('renders step 1 then user updates amount and clicks on next step button', async () => {
  const { getByText, getByLabelText } = renderWithRedux(
    <ResponsiveContext.Provider value={{ width: 1200 }}>
      <Buy getTokens={jest.fn()} />
    </ResponsiveContext.Provider>,
    { initialState }
  );

  const button = getByText(/next step/i);
  const amountInput = getByLabelText(/choose amount/i);

  fireEvent.change(amountInput, { target: { value: 23 } });
  fireEvent.click(button);

  await wait(() => {
    expect(getByText(/payment method/i)).toBeInTheDocument();
    expect(getByText(/manual bank transfer/i)).toBeInTheDocument();
    expect(getByText(/automated bank transfer/i)).toBeInTheDocument();
    expect(
      getByText(/buying cash36 tokens is as simple as a bank transfer/i)
    ).toBeInTheDocument();
  });
});
