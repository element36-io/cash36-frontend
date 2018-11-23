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

export const removeContact = id => async dispatch => {
  try {
    await API.delete(`/cash36/contacts/${id}`);
    dispatch({
      type: REMOVE_CONTACTS,
      payload: id
    });
  } catch (error) {
    dispatch({ type: CONTACTS_ERROR, payload: error });
    return Promise.reject(error);
  }
};

export const addContact = data => async dispatch => {
  try {
    const response = await API.post('/cash36/contacts', data);

    dispatch({
      type: ADD_CONTACTS,
      payload: response.data
    });

    return Promise.resolve();
  } catch (error) {
    dispatch({ type: CONTACTS_ERROR, payload: error });
    return Promise.reject(error);
  }
};
