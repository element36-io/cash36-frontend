import {
  USER_LOGGED_IN,
  USER_ATTESTED,
  USER_LOGGED_OUT
} from './types'

export function userLoggedIn (credentials, userAddress) {
  return {
    type: USER_LOGGED_IN,
    credentials: credentials,
    loggedInAddress: userAddress
  }
}

export function userAttested (attest) {
  return {
    type: USER_ATTESTED,
    attest: attest
  }
}

export function userLoggedOut () {
  return {
    type: USER_LOGGED_OUT
  }
}

export function logout () {
  return async (dispatch) => {
    try {
      console.log('logout')
      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')
      localStorage.removeItem('expires_at')
      dispatch(userLoggedOut())
    } catch (error) {
      console.log(error)
    }
    return Promise.resolve()
  }
}
