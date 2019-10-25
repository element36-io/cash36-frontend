import API from '../../config/api';
import { handleError } from '../../helpers/error.helpers';

import {
  GET_WALLETS
  // REMOVE_WALLET,
  // UPDATE_WALLET_DESCRIPTION,
  // SET_MAIN_WALLET
} from './wallets.types';

export const getWallets = () => async dispatch => {
  try {
    const response = await API.get('/compliance/wallet/list');
    dispatch({
      type: GET_WALLETS,
      payload: response.data || []
    });
  } catch (error) {
    return handleError(error);
  }
};

export const addWallet = (
  accountAddress,
  walletType,
  networkId,
  shortDescription,
  contractAddress
) => async dispatch => {
  try {
    await API.post('/compliance/wallet/add', {
      accountAddress,
      walletType,
      networkId,
      shortDescription,
      contractAddress
    });
    dispatch(getWallets());
    return Promise.resolve();
  } catch (error) {
    return handleError(error);
  }
};
