import {
  AUTH_USER,
  AUTH_ERROR,
  CLEAR_ERRORS,
  GET_KYC,
  CONFIRM_ATTESTATION,
  ATTESTATION_PROGRESS
} from './auth.actions';

const initialState = {
  isAuthenticated: !!localStorage.getItem('access_token'),
  user: JSON.parse(localStorage.getItem('state')) ? JSON.parse(localStorage.getItem('state')).user : undefined,
  attesting: false
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
          ...action.payload
        }
      };
    case ATTESTATION_PROGRESS:
      return {
        ...state,
        attesting: true
      };
    case CONFIRM_ATTESTATION:
      return {
        ...state,
        user: {
          ...state.user,
          verified: [
            ...state.user.verified,
            action.payload
          ]
        },
        attesting: false
      };
    default:
      return state;
  }
};
