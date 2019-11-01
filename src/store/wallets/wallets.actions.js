import API from '../../config/api';
import { handleError } from '../../helpers/error.helpers';

import { GET_WALLETS } from './wallets.types';

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
