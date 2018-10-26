import { AUTH_USER, AUTH_ERROR, CLEAR_ERRORS, GET_KYC } from './auth.actions';

const initialState = {
  isAuthenticated: !!localStorage.getItem('access_token'),
  user: JSON.parse(localStorage.getItem('state')) ? JSON.parse(localStorage.getItem('state')).user : undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
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
    case GET_KYC:
      return {
        ...state,
        user: {
          ...state.user,
          kycLevel: action.payload.kycLevel,
          kycProcessStatus: action.payload.kycProcessStatus
        }
      };
    default:
      return state;
  }
};
