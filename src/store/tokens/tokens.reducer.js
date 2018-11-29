import { GET_TOKENS, GET_USER_ACTIVITY, FETCHING_FILTERS, HISTORY_FILTERED } from './tokens.actions';

const initialState = {
  historyFiltered: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_TOKENS:
      return {
        ...state,
        tokens: action.payload
      };
    case FETCHING_FILTERS:
      return {
        ...state,
        fetchingFilters: action.payload
      };
    case HISTORY_FILTERED:
      return {
        ...state,
        historyFiltered: action.payload
      };
    case GET_USER_ACTIVITY:
      return {
        ...state,
        userActivity: action.payload
      };
    default:
      return state;
  }
};
