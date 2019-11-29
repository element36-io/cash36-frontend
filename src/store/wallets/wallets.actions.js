import API from '../../config/api';
import { handleError } from '../../helpers/error.helpers';

import {
  GET_WALLETS,
  REMOVE_LOGGEDIN_WALLET,
  SET_LOGGEDIN_WALLET
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

export const setMainWallet = async address => {
  try {
    await API.put(`/compliance/wallet/updateMain/${address}`);
  } catch (error) {
    return handleError(error);
  }
};

export const deleteWallet = async address => {
  try {
    await API.delete(`/compliance/wallet/delete/${address}`);
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
  } catch (error) {
    return handleError(error);
  }
};

export const removeLoggedInWallet = () => ({ type: REMOVE_LOGGEDIN_WALLET });

export const setLoggedInWallet = data => ({
  type: SET_LOGGEDIN_WALLET,
  payload: data
});

export const getMinFunds = async () => {
  try {
    const response = await API.get('/compliance/prefund/minFunds');
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

export const fundWallet = async (walletAddress, tokenSymbol) => {
  try {
    const response = await API.post(
      `/compliance/prefund/sendto/${walletAddress}/${tokenSymbol}`
    );
  } catch (error) {
    return handleError(error);
  }
};
