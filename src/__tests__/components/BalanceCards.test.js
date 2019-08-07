import React from 'react';
// import { render } from '@testing-library/react';

import BalanceCards from '../../components/BalanceCards';
import { renderWithRedux, createReduxStore } from '../../helpers/tests.helpers';
import store from '../../store';

// const store = createReduxStore({
//   auth: {
//     attesting: false,
//     isAuthenticated: true
//   },
//   tokens: []
// });
console.log(store.getState());
test('renders the component', () => {
  const { container } = renderWithRedux(<BalanceCards />, { store });

  expect(container.firstChild).toBeVisible();
});
