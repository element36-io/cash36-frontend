import authReducer from './auth.reducer';
import {
  AUTH_USER,
  CLEAR_ERRORS,
  UPORT_LOGIN,
  AUTH_ERROR,
  GET_KYC
} from './auth.actions';

const defaultState = {
  defaultProp: 'default'
};

it('should set uport login data', () => {
  const action = {
    type: UPORT_LOGIN,
    payload: {
      name: 'John Smith'
    }
  };

  const state = authReducer(defaultState, action);

  expect(state).toEqual({ ...defaultState, uportCreds: action.payload });
});

it('should set user login data', () => {
  const action = {
    type: AUTH_USER,
    payload: {
      isAuthenticated: true,
      user: {
        name: 'John Smith'
      },
      errorMessage: ''
    }
  };

  const state = authReducer(defaultState, action);

  expect(state).toEqual({ ...defaultState, ...action.payload });
});

it('should set auth error', () => {
  const action = {
    type: AUTH_ERROR,
    payload: 'some error message'
  };

  const state = authReducer(defaultState, action);

  expect(state.errorMessage).toEqual(action.payload);
});

it('should clear error message', () => {
  const action = {
    type: CLEAR_ERRORS,
    payload: ''
  };

  const state = authReducer(defaultState, action);

  expect(state.errorMessage).toBe('');
});

it('should set proper Kyc status state', () => {
  const action = {
    type: GET_KYC,
    payload: {
      kycLevel: 'Tier_0',
      kycProcessStatus: null
    }
  };

  const state = authReducer(defaultState, action);

  expect(state).toEqual({ ...defaultState, user: { ...action.payload } });
});
