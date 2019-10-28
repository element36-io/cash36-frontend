import React from 'react';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, cleanup } from '@testing-library/react';

import { reducers } from '../store';
import { AvatarContext } from '../providers/avatar.provider';
import { Web3Context } from '../providers/web3.provider';

afterEach(cleanup);

export function renderWithRedux (
  component,
  {
    initialState,
    store = createStore(reducers, initialState, applyMiddleware(thunk))
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

export function renderWithAvatarContext (
  component,
  renderFunction = render,
  state = {},
  actions = {}
) {
  return renderFunction(
    <AvatarContext.Provider value={{ state, actions }}>
      {component}
    </AvatarContext.Provider>
  );
}

export function renderWithWeb3Context (component, renderFunction = render) {
  return renderFunction(
    <Web3Context.Provider value={{ networkId: 4, network: 'Rinkeby' }}>
      {component}
    </Web3Context.Provider>
  );
}

export function renderWithRouterAndRedux (
  component,
  {
    initialState = {},
    route = '/',
    history = createMemoryHistory({ initialEntries: [route] })
  } = {}
) {
  const middlewares = [thunk];
  const mockStore = configureMockStore(middlewares);
  const store = mockStore(initialState);

  return {
    ...render(
      <Router history={history}>
        <Provider store={store}>{component}</Provider>
      </Router>
    ),
    history
  };
}
