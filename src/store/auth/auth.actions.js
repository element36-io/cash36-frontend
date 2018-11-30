import axios from 'axios';
import { MNID } from 'uport-connect';
import API, { API_ROOT } from '../../config/api';

export const AUTH_USER = 'AUTH_USER';
export const GET_KYC = 'GET_KYC';
export const ATTESTATION_PROGRESS = 'ATTESTATION_PROGRESS';
export const CONFIRM_ATTESTATION = 'CONFIRM_ATTESTATION';

export const checkUserAddress = address => API.get(`/public/is-user/${address}`);

export const logout = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  localStorage.removeItem('expires_at');
  localStorage.removeItem('user');
  return {
    type: AUTH_USER,
    payload: { isAuthenticated: false, user: {} }
  };
};

export const getKyc = () => async dispatch => {
  try {
    const response = await API.get('/cash36/user/current-user');

    dispatch({
      type: GET_KYC,
      payload: response.data
    });
  } catch (error) {
    if (error.response.status === 401) {
      console.log('Access unauthorized');
    }
  }
};

export const register = (username, password, user) => async dispatch => {
  try {
    await axios.post(
      `${API_ROOT}/public/register`,
      { username, password, avatarUrl: user.avatarUri }
    );
    login(username, password, user)(dispatch);
  } catch (error) {
    return Promise.reject(error.response.data.message || 'An error has occured');
  }
};

export const login = (username, password, user) => async dispatch => {
  const config = {
    data: `username=${username}&password=${password}&grant_type=password`,
    headers: {
      'Authorization': 'Basic Y2FzaDM2LWNsaWVudDpjYXNoMzYtc2VjcmV0',
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  };

  try {
    const response = await axios.post(
      `${API_ROOT}/oauth/token`,
      config.data,
      { headers: config.headers }
    );

    const token = response.data;

    localStorage.setItem('access_token', token.access_token);
    localStorage.setItem('refresh_token', token.refresh_token);
    let expiresAt = new Date().getTime() + (token.expires_in * 1000);
    localStorage.setItem('expires_at', expiresAt);

    dispatch({
      type: AUTH_USER,
      payload: {
        isAuthenticated: true,
        user
      }
    });
    dispatch(getKyc());
  } catch (error) {
    return Promise.reject(error.response.data.error_description);
  }
};

export const createUserObject = uportCreds => {
  const username = MNID.decode(uportCreds.networkAddress).address;
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