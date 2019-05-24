import API from '../../config/api';

export const GET_CONTACTS = 'GET_CONTACTS';
export const GET_CONTACTS_SUCCESS = 'GET_CONTACTS_SUCCESS';
export const CONTACTS_ERROR = 'CONTACTS_ERROR';
export const ADD_CONTACTS = 'ADD_CONTACTS';
export const REMOVE_CONTACTS = 'REMOVE_CONTACTS';
export const ADD_QUICK_TRANSFER = 'ADD_QUICK_TRANSFER';
export const REMOVE_QUICK_TRANSFER = 'REMOVE_QUICK_TRANSFER';

export const getContacts = () => async dispatch => {
  try {
    dispatch({ type: GET_CONTACTS });
    const response = await API.get('/exchange/contacts');

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
    await API.delete(`/exchange/contacts/${id}`);
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
    const response = await API.post('/exchange/contacts', data);

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

export const addQuickTransfer = contact => ({
  type: ADD_QUICK_TRANSFER,
  payload: contact
});
export const removeQuickTransfer = () => ({ type: REMOVE_QUICK_TRANSFER });
