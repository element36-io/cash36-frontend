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

const web3Values = {
  networkId: 4,
  network: 'Rinkeby',
  utils: { isAddress: jest.fn() }
};

afterEach(cleanup);

export function renderWithRedux (
  component,
  {
    initialState,
    store = createStore(reducers, initialState, applyMiddleware(thunk))
  } = {}
) {
  return {
    ...render(
      <Web3Context.Provider value={{ ...web3Values }}>
        <Provider store={store}>{component}</Provider>
      </Web3Context.Provider>,
      store
    )
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

export function renderWithAvatarContextAndRouter (
  component,
  {
    route = '/',
    history = createMemoryHistory({ initialEntries: [route] })
  } = {},
  state = {},
  actions = {}
) {
  return {
    ...render(
      <Router history={history}>
        <Web3Context.Provider value={{ ...web3Values }}>
          <AvatarContext.Provider value={{ state, actions }}>
            {component}
          </AvatarContext.Provider>
        </Web3Context.Provider>
      </Router>
    ),
    history
  };
}

export function renderWithAvatarContext (
  component,
  renderFunction = render,
  {
    route = '/',
    history = createMemoryHistory({ initialEntries: [route] })
  } = {},
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
    <Web3Context.Provider value={{ ...web3Values }}>
      {component}
    </Web3Context.Provider>
  );
}
