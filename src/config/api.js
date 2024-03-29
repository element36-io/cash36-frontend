import axios from 'axios';
import store from '../store';
import { logout } from '../store/auth/auth.actions';

export const API_ROOT = process.env.REACT_APP_API_URL;
export const WEB3_NODE = process.env.REACT_APP_WEB3_URL;
export const CAPTCHA_KEY = process.env.REACT_APP_CAPTCHA_KEY;

const api = axios.create({
  baseURL: API_ROOT
});

const getRefreshedToken = async refreshToken => {
  const config = {
    data: `grant_type=refresh_token&refresh_token=${refreshToken}`,
    headers: {
      Authorization: 'Basic Y2FzaDM2LWNsaWVudDpjYXNoMzYtc2VjcmV0',
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  };
  // Tries to get a refresh token, if it fails, sends 401.
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
    localStorage.setItem(
      'expires_at',
      new Date().getTime() + token.expires_in * 1000
    );

    return token.access_token;
  } catch (error) {
    console.log('Token expired, logging you out...');
    store.dispatch(logout());
  }
};

// Intercept the request and inject the token into headers. Check if token is expired and call getRefreshedToken function if needed.
api.interceptors.request.use(
  async function(config) {
    const getToken = async () => {
      const token = localStorage.getItem('access_token');
      const refreshToken = localStorage.getItem('refresh_token');
      const expiresAt = localStorage.getItem('expires_at');

      // Check if expired and if true, get new
      if (token && new Date().getTime() > expiresAt) {
        return getRefreshedToken(refreshToken);
      } else {
        return token;
      }
    };
    // set access_token
    const token = await getToken();
    // add access_token to the request headers
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);

export default api;
