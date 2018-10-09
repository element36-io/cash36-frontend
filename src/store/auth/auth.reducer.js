import { AUTH_USER, AUTH_ERROR } from './auth.actions'

const initialState = {
  isAuthenticated: !!localStorage.getItem('access_token')
}

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTH_USER:
      return {
        ...state,
        isAuthenticated: action.payload,
        errorMessage: ''
      }
    case AUTH_ERROR:
      return {
        ...state,
        errorMessage: action.payload
      }
    default:
      return state
  }
}
