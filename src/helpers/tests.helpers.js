import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import { render, cleanup } from '@testing-library/react';

import { reducers } from '../store';

afterEach(cleanup);

export function renderWithRedux (
  component,
  {
    initialState,
    store = createStore(reducers, initialState, applyMiddleware[thunk])
  } = {}
) {
  return {
    ...render(<Provider store={store}>{component}</Provider>, store)
  };
}

export function renderWithRouter (
  component,
  {
    route = '/',
    history = createMemoryHistory({ initialEntries: [route] })
  } = {}
) {
  return {
    ...render(<Router history={history}>{component}</Router>),
    history
  };
}
