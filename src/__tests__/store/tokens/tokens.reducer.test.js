import tokensReducer from '../../../store/tokens/tokens.reducer';
import {
  GET_TOKENS,
  GET_USER_ACTIVITY,
  FETCHING_FILTERS,
  HISTORY_FILTERED
} from '../../../store/tokens/tokens.types';

test('updates the state after GET_TOKENS was called', () => {
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

test('updates the state after GET_USER_ACTIVITY was called', () => {
  const userActivity = {
    activity: 'activity'
  };

  const action = {
    type: GET_USER_ACTIVITY,
    payload: userActivity
  };

  const state = tokensReducer({}, action);

  expect(state.userActivity).toEqual(action.payload);
});

test('updates the state after FETCHING_FILTERS was called', () => {
  const action = {
    type: FETCHING_FILTERS,
    payload: true
  };

  const state = tokensReducer({ fetchingFilters: false }, action);

  expect(state.fetchingFilters).toBe(true);
});

test('updates the state after HISTORY_FILTERED was called', () => {
  const action = {
    type: HISTORY_FILTERED,
    payload: true
  };

  const state = tokensReducer({ historyFiltered: false }, action);

  expect(state.historyFiltered).toBe(true);
});
