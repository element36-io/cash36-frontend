import axios from 'axios';

const baseUrl = 'http://localhost:3005';

// Response last 600sec, refresh after 600sec with new qr code or increase duration on node server
export const getLoginQr = () => {
  return axios(baseUrl);
};

export const checkRequestStatus = async callbackUrl => {
  try {
    const accessToken = await initInterval(async () => {
      const response = await axios(callbackUrl);
      return response.data.message.access_token || null;
    });
    const creds = await verifyResponse(accessToken);
    return creds.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const verifyResponse = accessToken => {
  return axios.post(`${baseUrl}/verify-request`, { accessToken });
};

export const attestUser = ({ did, pushToken, boxPub, claim }) => {
  return axios.post(`${baseUrl}/attest`, {
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
  boxPub
}) => {
  const callbackUrl = await axios.post(`${baseUrl}/transaction-request`, {
    txObj,
    networkId,
    pushToken,
    boxPub
  });
  return initInterval(async () => {
    const response = await axios(callbackUrl.data);
    console.log('=====');
    console.log(response.data.message);
    console.log('=====');
    return null;
  });
};

const initInterval = (callback, cancel = () => false) =>
  new Promise((resolve, reject) => {
    let interval = setInterval(async () => {
      if (cancel()) {
        reject('Request aborted');
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
