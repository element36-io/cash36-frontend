import { AUTH_USER, GET_KYC } from './auth.actions';

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
    case GET_KYC:
      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload
        }
      };
    default:
      return state;
  }
};
