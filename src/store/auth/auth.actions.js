import axios from 'axios';
import API, { API_ROOT } from '../../config/api';
import { handleError } from '../../helpers/error.helpers';

import { AUTH_USER, GET_USER_INFO, GET_CURRENT_KYC_STEP } from './auth.types';

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
    return handleError(error);
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
    return handleError(error);
  }
};

export const startKycProcess = () => async dispatch => {
  try {
    await API.post(`/compliance/kyc/start-process`, {});
    dispatch(getCurrentKycStep());
    dispatch(getUserInfo());
  } catch (error) {
    return handleError(error);
  }
};

export const updateKycStep = (step, payload, params) => async dispatch => {
  try {
    await API.post(`/compliance/kyc/step-${step}`, payload, { params });
    dispatch(getCurrentKycStep());
    dispatch(getUserInfo());
  } catch (error) {
    return handleError(error);
  }
};

export const getSelfieCode = async () => {
  try {
    const response = await API.get(`/compliance/kyc/get-step3-code`);

    return response.data.result;
  } catch (error) {
    return handleError(error);
  }
};

export const getIndustries = async () => {
  try {
    const response = await API.get(`/compliance/data/industries`);
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

export const register = (username, password) => async dispatch => {
  try {
    await axios.post(`${API_ROOT}/auth/user/register`, {
      username,
      password
    });
    dispatch(login(username, password));
  } catch (error) {
    return Promise.reject(
      error.response.data.message || 'An error has occured'
    );
  }
};

export const login = (username, password) => async dispatch => {
  const user = {
    username
  };
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
    const expiresAt = new Date().getTime() + token.expires_in * 1000;
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
    return (
      Promise.reject(error.response.data.error_description) ||
      'An error has occured'
    );
  }
};

export const resetPassword = async email => {
  try {
    await axios.get(`${API_ROOT}/auth/user/reset-user/${email}`);
  } catch (error) {
    return handleError(error);
  }
};

export const setNewPassword = async (challenge, password, username) => {
  try {
    await axios.post(`${API_ROOT}/auth/user/reset`, {
      challenge,
      password,
      username
    });
  } catch (error) {
    return handleError(error);
  }
};
