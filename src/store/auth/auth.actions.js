import axios from 'axios';
import API, { API_ROOT } from '../../config/api';

export const AUTH_USER = 'AUTH_USER';
export const AUTH_ERROR = 'AUTH_ERROR';
export const CLEAR_ERRORS = 'CLEAR_ERRORS';
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
    console.log(error);
  }
};

export const register = (username, password, avatarUrl) => async dispatch => {
  try {
    await axios.post(
      `${API_ROOT}/public/register`,
      { username, password, avatarUrl }
    );
  } catch (error) {
    dispatch({
      type: AUTH_ERROR,
      payload: error.response.data.message
    });
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
    dispatch({
      type: AUTH_ERROR,
      payload: error.response.data.error_description
    });
  }
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

export const clearErrors = () => ({ type: CLEAR_ERRORS });
