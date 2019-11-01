import API from '../config/api';
import { handleError } from './error.helpers';

export const e36WalletType = 'E36_WALLET';

export const isWalletAddress = async address => {
  try {
    const response = await API.get(
      `/compliance/wallet/getAddressType/${address.toLowerCase()}`
    );

    return response.data.result === e36WalletType;
  } catch (error) {
    return handleError(error);
  }
};

export const getMainWalletAddress = walletList =>
  walletList.find(wallet => wallet.mainWallet).accountAddress;
