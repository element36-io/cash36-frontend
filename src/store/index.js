import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import throttle from 'lodash/throttle';
import { apiCall } from './middleware/api.middleware';
import { saveState } from './localStorage';

import authReducer from './auth/auth.reducer';
import tokensReducer from './tokens/tokens.reducer';
import countriesReducer from './countries/countries.reducer';
import notificationsReducer from './notifications/notifications.reducer';
import contactsReducer from './contacts/contacts.reducer';
import kycReducer from './kyc/kyc.reducer';

const loggerMiddleware = createLogger();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducers = combineReducers({
  auth: authReducer,
  tokens: tokensReducer,
  countries: countriesReducer,
  notifications: notificationsReducer,
  contacts: contactsReducer,
  kyc: kycReducer
});

const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(thunkMiddleware, loggerMiddleware, apiCall))
);

store.subscribe(
  throttle(() => {
    saveState({
      user: store.getState().auth.user,
      kyc: store.getState().kyc
    });
  }, 1000)
);

export default store;
