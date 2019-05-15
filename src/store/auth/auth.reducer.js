import {
  AUTH_USER,
  GET_USER_INFO,
  CONFIRM_ATTESTATION,
  ATTESTATION_PROGRESS,
  GET_CURRENT_KYC_STEP
} from './auth.actions';

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
        user,
        errorMessage: ''
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
          verified: [...state.user.verified, action.payload]
        },
        attesting: false
      };
    default:
      return state;
  }
};
