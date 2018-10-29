import tokensReducer from './tokens.reducer';
import { GET_TOKENS, GET_USER_ACTIVITY } from './tokens.actions';

const defaultState = [];

it('should set tokens data', () => {
  const action = {
    type: GET_TOKENS,
    payload: ['token 1', 'token 2']
  };

  const state = tokensReducer(defaultState, action);

  expect(state).toEqual({
    tokens: action.payload
  });
});

it('should set userActivity data', () => {
  const action = {
    type: GET_USER_ACTIVITY,
    payload: ['activity 1', 'activity 2']
  };

  const state = tokensReducer(defaultState, action);

  expect(state).toEqual({
    userActivity: action.payload
  });
});
