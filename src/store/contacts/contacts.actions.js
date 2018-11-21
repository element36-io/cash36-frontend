import API from '../../config/api';

export const GET_CONTACTS = 'GET_CONTACTS';
export const GET_CONTACTS_SUCCESS = 'GET_CONTACTS_SUCCESS';
export const CONTACTS_ERROR = 'CONTACTS_ERROR';
export const ADD_CONTACTS = 'ADD_CONTACTS';
export const REMOVE_CONTACTS = 'REMOVE_CONTACTS';

export const getContacts = () => async dispatch => {
  try {
    dispatch({ type: GET_CONTACTS });
    const response = await API.get('/cash36/contacts');

    dispatch({
      type: GET_CONTACTS_SUCCESS,
      payload: response.data
    });
  } catch (error) {
    // Do better error handling
    dispatch({ type: CONTACTS_ERROR, payload: error });
    return Promise.reject(error);
  }
};
