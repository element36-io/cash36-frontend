import authReducer from '../../../store/auth/auth.reducer';
import {
  AUTH_USER,
  GET_USER_INFO,
  GET_CURRENT_KYC_STEP
} from '../../../store/auth/auth.types';

const initialState = {
  isAuthenticated: false,
  user: { username: '0x000000000000000000000000000000000000001' },
  attesting: false,
  kyc: {}
};

test('updates the state after AUTH_USER was dispatched', () => {
  const action = {
    type: AUTH_USER,
    payload: {
      isAuthenticated: true,
      user: {
        username: '0x000000000000000000000000000000000000001'
      }
    }
  };

  const state = authReducer(initialState, action);

  expect(state).toEqual({
    ...initialState,
    isAuthenticated: action.payload.isAuthenticated,
    user: action.payload.user
  });
});

test('updates the state after GET_USER_INFO was dispatched', () => {
  const action = {
    type: GET_USER_INFO,
    payload: { name: 'John Doe' }
  };

  const state = authReducer(initialState, action);

  expect(state).toEqual({
    ...initialState,
    user: {
      ...initialState.user,
      ...action.payload
    }
  });
});

test('updates the state after GET_CURRENT_KYC_STEP was dispatched', () => {
  const action = {
    type: GET_CURRENT_KYC_STEP,
    payload: 'START'
  };

  const state = authReducer(initialState, action);

  expect(state).toEqual({
    ...initialState,
    kyc: {
      ...initialState.kyc,
      currentStep: action.payload
    }
  });
});
