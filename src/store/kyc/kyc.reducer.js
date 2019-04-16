import { GET_CURRENT_PROCESS_STATUS } from './kyc.actions';

const initialState = {
  currentProcessStatus: JSON.parse(localStorage.getItem('state')).kyc
    ? JSON.parse(localStorage.getItem('state')).kyc.currentProcessStatus
    : undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_CURRENT_PROCESS_STATUS:
      return { ...state, currentProcessStatus: action.payload };

    default:
      return state;
  }
};
