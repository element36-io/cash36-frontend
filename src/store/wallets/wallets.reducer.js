import {
  GET_WALLETS,
  REMOVE_LOGGEDIN_WALLET,
  SET_LOGGEDIN_WALLET
} from './wallets.types';

const initialState = {
  walletList: [],
  loggedInWallet: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_WALLETS:
      return {
        ...state,
        walletList: action.payload
      };
    case SET_LOGGEDIN_WALLET:
      return { ...state, loggedInWallet: action.payload };
    case REMOVE_LOGGEDIN_WALLET:
      return { ...state, loggedInWallet: null };
    default:
      return state;
  }
};
