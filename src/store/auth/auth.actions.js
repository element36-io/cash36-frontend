import axios from 'axios';
// import { MNID } from 'uport-connect';
import API, { API_ROOT } from '../../config/api';

export const AUTH_USER = 'AUTH_USER';
export const GET_USER_INFO = 'GET_USER_INFO';
export const ATTESTATION_PROGRESS = 'ATTESTATION_PROGRESS';
export const CONFIRM_ATTESTATION = 'CONFIRM_ATTESTATION';
export const GET_CURRENT_PROCESS_STATUS = 'GET_CURRENT_PROCESS_STATUS';

export const checkUserAddress = address =>
  API.get(`/public/is-user/${address}`);

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

export const getCurrentProcessStatus = () => async dispatch => {
  try {
    const response = await API.get('/cash36/kyc/get-step');

    const processStatus = response.data.result;

    dispatch({
      type: GET_CURRENT_PROCESS_STATUS,
      payload: processStatus
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateProcessStatus = (step, payload) => async dispatch => {
  try {
    await API.post(`/cash36/kyc/step-${step}`, payload);
    getCurrentProcessStatus()(dispatch);
  } catch (error) {
    console.warn(error);
  }
};

export const getUserInfo = () => async dispatch => {
  try {
    const response = await API.get('/cash36/user/current-user');

    dispatch({
      type: GET_USER_INFO,
      payload: response.data
    });
  } catch (error) {
    console.warn(error);
  }
};

export const register = (username, password, user) => async dispatch => {
  try {
    await axios.post(`${API_ROOT}/public/register`, {
      username,
      password,
      avatarUrl: user.avatarUri
    });
    login(username, password, user)(dispatch);
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
    const response = await axios.post(`${API_ROOT}/oauth/token`, config.data, {
      headers: config.headers
    });

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

export const createUserObject = uportCreds => {
  // const username = MNID.decode(uportCreds.networkAddress).address;
  const username = uportCreds.networkAddress;
  const user = {
    username,
    name: uportCreds.name,
    avatarUri: uportCreds.avatar ? uportCreds.avatar.uri : null,
    lastLoggedIn: new Date().getTime(),
    uportAddress: uportCreds.address,
    verified: uportCreds.verified
  };

  return {
    username,
    user
  };
};
export const attestationProgress = () => {
  return {
    type: ATTESTATION_PROGRESS
  };
};

export const confirmAttestation = data => {
  return {
    type: CONFIRM_ATTESTATION,
    payload: data
  };
};
