import React from 'react';

import { renderWithRouter } from '../../../helpers/tests.helpers';
import QuickActions from '../../../views/Home/QuickActions';
import { fireEvent } from '@testing-library/react';

test('renders the component', () => {
  const { getByText } = renderWithRouter(<QuickActions />);

  expect(getByText(/buy/i)).toBeInTheDocument();
  expect(getByText(/sell/i)).toBeInTheDocument();
  expect(getByText(/transfer/i)).toBeInTheDocument();
});

describe('routes', () => {
  let component;
  beforeEach(() => {
    component = renderWithRouter(<QuickActions />, { route: '/' });
  });

  test('routes to /buy', () => {
    const { getByText, history } = component;
    const buyButton = getByText(/buy/i);

    expect(history.location.pathname).toBe('/');
    fireEvent.click(buyButton);
    expect(history.location.pathname).toBe('/buy');
  });

  test('routes to /sell', () => {
    const { getByText, history } = component;
    const sellButton = getByText(/sell/i);

    expect(history.location.pathname).toBe('/');
    fireEvent.click(sellButton);
    expect(history.location.pathname).toBe('/sell');
  });

  test('routes to /transfer', () => {
    const { getByText, history } = component;
    const transferButton = getByText(/transfer/i);

    expect(history.location.pathname).toBe('/');
    fireEvent.click(transferButton);
    expect(history.location.pathname).toBe('/transfer');
  });
});
