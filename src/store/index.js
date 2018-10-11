import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import throttle from 'lodash/throttle';
import { saveState } from './localStorage';
import authReducer from './auth/auth.reducer';
import tokensReducer from './tokens/tokens.reducer';

const loggerMiddleware = createLogger();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducers = combineReducers({
  auth: authReducer,
  tokens: tokensReducer
});

const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(
    thunkMiddleware,
    loggerMiddleware
  ))
);

store.subscribe(throttle(() => {
  saveState({
    user: store.getState().auth.user
  });
}, 1000));

export default store;
