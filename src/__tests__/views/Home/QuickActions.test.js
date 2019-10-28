import React from 'react';

import { renderWithRouterAndRedux } from '../../../helpers/tests.helpers';
import QuickActions from '../../../views/Home/QuickActions';
import { fireEvent } from '@testing-library/react';

const initialState = {
  wallets: {
    walletList: []
  }
};

test('renders the component', () => {
  const { getByText } = renderWithRouterAndRedux(<QuickActions />, {
    initialState
  });
  expect(getByText(/buy/i)).toBeInTheDocument();
  expect(getByText(/sell/i)).toBeInTheDocument();
  expect(getByText(/send/i)).toBeInTheDocument();
});

describe('routes', () => {
  test('routes to /buy', () => {
    const { getByText, history } = renderWithRouterAndRedux(<QuickActions />, {
      initialState
    });
    const buyButton = getByText(/buy/i);

    expect(history.location.pathname).toBe('/');
    fireEvent.click(buyButton);
    expect(history.location.pathname).toBe('/buy');
  });

  test('routes to /sell if there is a wallet', () => {
    const initialState = {
      wallets: {
        walletList: ['1']
      }
    };

    const { getByText, history } = renderWithRouterAndRedux(<QuickActions />, {
      initialState
    });

    const sellButton = getByText(/sell/i);

    expect(history.location.pathname).toBe('/');
    fireEvent.click(sellButton);
    expect(history.location.pathname).toBe('/sell');
  });

  test("doesn't route if no wallet", () => {
    const { getByText, history } = renderWithRouterAndRedux(<QuickActions />, {
      initialState
    });

    const sellButton = getByText(/sell/i);

    expect(history.location.pathname).toBe('/');
    fireEvent.click(sellButton);
    expect(history.location.pathname).toBe('/');
  });

  // TODO: Rewrite test when feature is implemented
  test('routes to /buy, step 2.2', () => {
    const { getByText, history } = renderWithRouterAndRedux(<QuickActions />, {
      initialState
    });
    const sendButton = getByText(/send/i);

    expect(history.location.pathname).toBe('/');
    fireEvent.click(sendButton);
    expect(history.location.pathname).toBe('/buy');
  });
});
