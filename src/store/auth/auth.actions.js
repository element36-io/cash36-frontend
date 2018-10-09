import axios from 'axios'
import { API_ROOT } from '../../config/api'

export const AUTH_USER = 'AUTH_USER';
export const AUTH_ERROR = 'AUTH_ERROR';

export const login = (username, password, callback) => async dispatch => {
  const config = {
    data: `username=${username}&password=${password}&grant_type=password`,
    headers: {
      'Authorization': 'Basic Y2FzaDM2LWNsaWVudDpjYXNoMzYtc2VjcmV0',
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }

  try {
    const response = await axios.post(
      `${API_ROOT}/oauth/token`,
      config.data,
      { headers: config.headers }
    )

    const token = response.data

    localStorage.setItem('access_token', token.access_token)
    localStorage.setItem('refresh_token', token.refresh_token)
    let expiresAt = new Date().getTime() + (token.expires_in * 1000)
    localStorage.setItem('expires_at', expiresAt)

    dispatch({
      type: AUTH_USER,
      payload: true
    })
    callback()
  } catch (error) {
    dispatch({
      type: AUTH_ERROR,
      payload: error.response.data.error_description
    })
  }
}

export const logout = () => dispatch => {
  localStorage.removeItem('access_token')
  localStorage.removeItem('refresh_token')
  localStorage.removeItem('expires_at')
  dispatch({
    type: AUTH_USER,
    payload: false
  })
}
