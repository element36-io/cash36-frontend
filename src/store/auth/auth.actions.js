import axios from 'axios';
import { MNID } from 'uport-connect';
import API, { API_ROOT } from '../../config/api';

export const AUTH_USER = 'AUTH_USER';
export const GET_USER_INFO = 'GET_USER_INFO';
export const ATTESTATION_PROGRESS = 'ATTESTATION_PROGRESS';
export const CONFIRM_ATTESTATION = 'CONFIRM_ATTESTATION';
export const GET_CURRENT_KYC_STEP = 'GET_CURRENT_KYC_STEP';

export const checkUserId = id => API.get(`/auth/user/is-user/${id}`);

export const logout = () => {
  localStorage.removeItem('state');
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  localStorage.removeItem('expires_at');
  return {
    type: AUTH_USER,
    payload: { isAuthenticated: false, user: null }
  };
};

export const getUserInfo = () => async dispatch => {
  try {
    const response = await API.get('/compliance/current-user');

    dispatch({
      type: GET_USER_INFO,
      payload: response.data
    });
  } catch (error) {
    console.warn(error);
  }
};

export const getCurrentKycStep = () => async dispatch => {
  try {
    const response = await API.get('/compliance/kyc/get-step');

    const processStatus = response.data.result;

    dispatch({
      type: GET_CURRENT_KYC_STEP,
      payload: processStatus
    });
  } catch (error) {
    return Promise.reject(error);
  }
};

export const startKycProcess = () => async dispatch => {
  try {
    await API.post(`/compliance/kyc/start-process`, {});
    dispatch(getCurrentKycStep());
    dispatch(getUserInfo());
  } catch (error) {
    console.log(error);
  }
};

export const updateKycStep = (step, payload) => async dispatch => {
  try {
    await API.post(`/compliance/kyc/step-${step}`, payload);
    dispatch(getCurrentKycStep());
    dispatch(getUserInfo());
  } catch (error) {
    return Promise.reject(error);
  }
};

export const register = (username, password, user) => async dispatch => {
  try {
    await axios.post(`${API_ROOT}/auth/user/register`, {
      username,
      password
    });
    dispatch(login(username, password, user));
  } catch (error) {
    return Promise.reject(
      error.response.data.message || 'An error has occured'
    );
  }
};

export const login = (username, password, user) => async dispatch => {
  const config = {
    data: `username=${username}&password=${password}&grant_type=password`,
    headers: {
      Authorization: 'Basic Y2FzaDM2LWNsaWVudDpjYXNoMzYtc2VjcmV0',
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  };

  try {
    const response = await axios.post(
      `${API_ROOT}/auth/oauth/token`,
      config.data,
      {
        headers: config.headers
      }
    );

    const token = response.data;

    localStorage.setItem('access_token', token.access_token);
    localStorage.setItem('refresh_token', token.refresh_token);
    let expiresAt = new Date().getTime() + token.expires_in * 1000;
    localStorage.setItem('expires_at', expiresAt);

    dispatch({
      type: AUTH_USER,
      payload: {
        isAuthenticated: true,
        user
      }
    });
    dispatch(getUserInfo());
  } catch (error) {
    return Promise.reject(error.response.data.error_description);
  }
};

export const createUserObject = (creds, useMetamask) => {
  console.warn(creds, useMetamask);
  const username = MNID.decode(creds.networkAddress).address;
  const user = {
    username,
    name: creds.name,
    avatarUri: creds.avatar ? creds.avatar.uri : null,
    lastLoggedIn: new Date().getTime(),
    uportAddress: creds.address,
    verified: creds.verified
  };

  return {
    username,
    user
  };
};

export const confirmAttestation = data => {
  return {
    type: CONFIRM_ATTESTATION,
    payload: data
  };
};
