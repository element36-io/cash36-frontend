import tokensReducer from './tokens.reducer';
import { GET_TOKENS } from './tokens.actions';

const defaultState = [];

it('should set tokens data', () => {
  const action = {
    type: GET_TOKENS,
    payload: ['token 1', 'token 2']
  };

  const state = tokensReducer(defaultState, action);

  expect(state).toEqual(action.payload);
});
