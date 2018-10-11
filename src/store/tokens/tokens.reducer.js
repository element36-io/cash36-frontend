import { GET_TOKENS } from './tokens.actions';

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_TOKENS:
      return action.payload;
    default:
      return state;
  }
};
