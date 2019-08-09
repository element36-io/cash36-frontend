import React from 'react';
import { renderWithRouter } from '../../helpers/tests.helpers';

import TransactionFooter from '../../components/TransactionFooter';
import { fireEvent } from '@testing-library/react';

test('renders the component with the image tag', () => {
  const { container } = renderWithRouter(<TransactionFooter />);

  expect(container.firstChild).toBeVisible();
});

test('routes to /history when go to history link is clicked', async () => {
  const { getByText, history } = renderWithRouter(<TransactionFooter />, {
    route: '/buy'
  });

  expect(history.location.pathname).toBe('/buy');

  const leftClick = { button: 0 };
  fireEvent.click(getByText('Go to account history'), leftClick);

  expect(history.location.pathname).toBe('/history');
});

test('routes to / when home link is clicked', async () => {
  const { getByText, history } = renderWithRouter(<TransactionFooter />, {
    route: '/buy'
  });

  expect(history.location.pathname).toBe('/buy');

  const leftClick = { button: 0 };
  fireEvent.click(getByText('Back to homepage'), leftClick);

  expect(history.location.pathname).toBe('/');
});
