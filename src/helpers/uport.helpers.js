import axios from 'axios';
import { API_ROOT } from '../config/api';

// Response last 600sec, refresh after 600sec with new qr code or increase duration on node server
export const getLoginQr = metamaskLogin =>
  axios(`${API_ROOT}/credentials/?metamask=${metamaskLogin}`);

export const checkRequestStatus = async (callbackUrl, cancel) => {
  try {
    const accessToken = await initInterval(async () => {
      const response = await axios(callbackUrl);
      return response.data.message.access_token || null;
    }, cancel);
    const creds = await verifyResponse(accessToken);
    return creds.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const verifyResponse = accessToken =>
  axios.post(`${API_ROOT}/credentials/verify-request`, { accessToken });

export const attestUser = ({ did, pushToken, boxPub, claim }) => {
  return axios.post(`${API_ROOT}/credentials/attest-creds`, {
    did,
    pushToken,
    boxPub,
    claim
  });
};

export const transactionRequest = async ({
  txObj,
  networkId,
  pushToken,
  boxPub,
  cancel
}) => {
  try {
    const txRequest = await axios.post(
      `${API_ROOT}/credentials/transaction-request`,
      {
        txObj,
        networkId,
        pushToken,
        boxPub
      }
    );

    const transactionStatus = await initInterval(async () => {
      const response = await axios(txRequest.data);
      if (response.data.message.error) {
        return Promise.reject(Error(response.data.message.error));
      }
      return response.data.message.tx || null;
    }, cancel);

    return transactionStatus;
  } catch (error) {
    return Promise.reject(error);
  }
};

const initInterval = (callback, cancel = () => false) =>
  new Promise((resolve, reject) => {
    let interval = setInterval(async () => {
      if (cancel()) {
        // eslint-disable-next-line prefer-promise-reject-errors
        reject('Request aborted');
        clearInterval(interval);
      }

      try {
        const data = await callback();
        if (data) {
          clearInterval(interval);
          resolve(data);
        }
      } catch (error) {
        clearInterval(interval);
        reject(error);
      }
    }, 3000);
  });
