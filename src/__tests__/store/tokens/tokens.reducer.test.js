import tokensReducer from '../../../store/tokens/tokens.reducer';
import {
  GET_TOKENS,
  GET_USER_ACTIVITY,
  FETCHING_FILTERS,
  HISTORY_FILTERED
} from '../../../store/tokens/tokens.types';

test('updates the state after getTokens action was called', () => {
  const tokens = [
    {
      symbol: 'CHF36'
    }
  ];

  const action = {
    type: GET_TOKENS,
    payload: tokens
  };

  const state = tokensReducer({}, action);

  expect(state.tokens).toEqual(action.payload);
});
