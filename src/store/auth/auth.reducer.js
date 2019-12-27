import {
  AUTH_USER,
  GET_USER_INFO,
  GET_CURRENT_KYC_STEP,
  SET_CAPTCHA_TOKEN
} from './auth.types';

const initialState = {
  isAuthenticated: !!localStorage.getItem('access_token'),
  captchaToken: '',
  user: JSON.parse(localStorage.getItem('state'))
    ? JSON.parse(localStorage.getItem('state')).user
    : undefined,
  attesting: false,
  kyc: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTH_USER:
      return {
        ...state,
        isAuthenticated: action.payload.isAuthenticated,
        user: action.payload.user
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
    case SET_CAPTCHA_TOKEN:
      return {
        ...state,
        captchaToken: action.payload
      };

    default:
      return state;
  }
};
