import API from '../../config/api';

export const GET_CURRENT_PROCESS_STATUS = 'GET_CURRENT_PROCESS_STATUS';

export const getCurrentProcessStatus = () => async dispatch => {
  try {
    const response = await API.get('/cash36/kyc/get-step');

    dispatch({
      type: GET_CURRENT_PROCESS_STATUS,
      payload: response.data.result
    });
  } catch (error) {
    if (error.response.status === 401) {
      console.log('Access unauthorized');
      return;
    }
    console.log(error);
  }
};
