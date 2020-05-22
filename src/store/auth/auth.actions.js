import axios from 'axios';
import API, { API_ROOT } from '../../config/api';
import { handleError } from '../../helpers/error.helpers';

import {
  AUTH_USER,
  GET_USER_INFO,
  GET_CURRENT_KYC_STEP,
  SET_CAPTCHA_TOKEN
} from './auth.types';

export const checkUserId = id => API.get(`/auth/user/is-user/${id}`);

export const setCaptchaToken = token => {
  return {
    type: SET_CAPTCHA_TOKEN,
    payload: token
  };
};

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

export const register = async (username, password, captchaToken) => {
  try {
    await axios.post(`${API_ROOT}/auth/user/register`, {
      username,
      password,
      emailUrl: `${window.location.origin}/account-activation`,
      captchaToken
    });
  } catch (error) {
    return handleError(error);
  }
};

export const activateUser = async code => {
  try {
    await axios.get(`${API_ROOT}/compliance/confirm/public/check?code=${code}`);
  } catch (error) {
    return Promise.reject(
      error.response.data.error_description || 'An error has occured'
    );
  }
};

export const resendActivationLink = async (emailUrl, username) => {
  try {
    await axios.post(`${API_ROOT}/auth/user/register-new-confirm`, {
      emailUrl,
      username
    });
  } catch (error) {
    return handleError(error);
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
    if (error.response && error.response.status===404){
      error.response.data["message"]="User not known.";
    } else { 
      return handleError(error);
    }
  }
};

export const resetPassword = async (userId, emailUrl) => {
  try {
    await axios.put(`${API_ROOT}/auth/user/reset-user/${userId}`, {
      emailUrl
    });
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

export const getAvatar = async () => {
  try {
    const response = await API.get('/compliance/avatar');

    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

export const uploadAvatar = async formData => {
  try {
    await API.post(`/compliance/avatar`, formData);
  } catch (error) {
    return handleError(error);
  }
};

export const deleteAvatar = async () => {
  try {
    await API.delete(`/compliance/avatar`);
  } catch (error) {
    return handleError(error);
  }
};
