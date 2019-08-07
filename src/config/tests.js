import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { render, cleanup } from '@testing-library/react';

import reducers from '../reducers';

afterEach(cleanup);

export function renderWithRedux (
  component,
  { initialState, store = createStore(reducers, initialState) } = {}
) {
  return {
    ...render(<Provider store={store}>{component}</Provider>, store)
  };
}

export function createReduxStore (state) {
  return createStore(() => state, {}, applyMiddleware(thunk));
}
