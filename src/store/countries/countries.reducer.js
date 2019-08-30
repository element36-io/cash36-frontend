import { GET_COUNTRIES } from './countries.types';

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_COUNTRIES:
      return action.payload;
    default:
      return state;
  }
};
