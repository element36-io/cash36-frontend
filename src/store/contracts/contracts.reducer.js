import { GET_CONTRACTS } from './contracts.types';

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_CONTRACTS:
      return action.payload;
    default:
      return state;
  }
};
