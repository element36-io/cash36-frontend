import {
  GET_WALLETS,
  REMOVE_WALLET,
  UPDATE_WALLET_DESCRIPTION,
  SET_MAIN_WALLET
} from './wallets.types';

const initialState = {
  walletList: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_WALLETS:
      return {
        walletList: action.payload
      };
    default:
      return state;
  }
};
