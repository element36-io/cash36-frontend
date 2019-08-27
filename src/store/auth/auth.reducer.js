import {
  AUTH_USER,
  GET_USER_INFO,
  GET_CURRENT_KYC_STEP,
  CONFIRM_ATTESTATION
} from './auth.types';

const initialState = {
  isAuthenticated: !!localStorage.getItem('access_token'),
  user: JSON.parse(localStorage.getItem('state'))
    ? JSON.parse(localStorage.getItem('state')).user
    : undefined,
  attesting: false,
  kyc: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTH_USER:
      const { isAuthenticated, user } = action.payload;
      return {
        ...state,
        isAuthenticated,
        user
      };
    case GET_USER_INFO:
      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload
        }
      };
    case GET_CURRENT_KYC_STEP:
      return {
        ...state,
        kyc: {
          ...state.kyc,
          currentStep: action.payload
        }
      };
    case CONFIRM_ATTESTATION:
      if (state.user.verified) {
        return {
          ...state,
          user: {
            ...state.user,
            verified: [...state.user.verified, action.payload]
          }
        };
      } else {
        return {
          ...state,
          user: {
            ...state.user,
            verified: [action.payload]
          }
        };
      }

    default:
      return state;
  }
};
