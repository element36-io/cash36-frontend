import React from 'react';
import { render } from '@testing-library/react';
import { Context as ResponsiveContext } from 'react-responsive';
import { renderWithRouter } from '../../helpers/tests.helpers';

import AuthHeader from '../../components/AuthWrapper/AuthHeader';

test('renders the component', () => {
  const { getByTestId } = render(<AuthHeader />);

  expect(getByTestId('auth__header')).toBeVisible();
});

test('renders logo', () => {
  const { getByAltText } = render(
    <ResponsiveContext.Provider value={{ width: 1200 }}>
      <AuthHeader />
    </ResponsiveContext.Provider>
  );

  expect(getByAltText('LOGO')).toBeInTheDocument();
});

test('renders header mobile dropdown', () => {
  const { getByTestId } = renderWithRouter(
    <ResponsiveContext.Provider value={{ width: 600 }}>
      <AuthHeader />
    </ResponsiveContext.Provider>
  );

  expect(getByTestId('auth__header__dropdown')).toBeVisible();
});
