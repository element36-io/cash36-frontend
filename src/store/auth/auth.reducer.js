import { UPORT_LOGIN, AUTH_USER, AUTH_ERROR, CLEAR_ERRORS } from './auth.actions';

const initialState = {
  isAuthenticated: !!localStorage.getItem('access_token'),
  user: JSON.parse(localStorage.getItem('state')) ? JSON.parse(localStorage.getItem('state')).user : undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case UPORT_LOGIN:
      return {
        ...state,
        uportCreds: action.payload
      };
    case AUTH_USER:
      const { isAuthenticated, user } = action.payload;
      return {
        ...state,
        isAuthenticated,
        user,
        errorMessage: ''
      };
    case AUTH_ERROR:
      return {
        ...state,
        errorMessage: action.payload
      };
    case CLEAR_ERRORS: {
      return {
        ...state,
        errorMessage: ''
      };
    }
    default:
      return state;
  }
};
