import API from '../../config/api';
import { handleError } from '../../helpers/error.helpers';

import {
  GET_CONTACTS,
  GET_CONTACTS_SUCCESS,
  ADD_CONTACTS,
  REMOVE_CONTACTS,
  CONTACTS_ERROR
} from './contacts.types';

export const getContacts = () => async dispatch => {
  try {
    dispatch({ type: GET_CONTACTS });
    const response = await API.get('/exchange/contacts');

    dispatch({
      type: GET_CONTACTS_SUCCESS,
      payload: response.data
    });
  } catch (error) {
    dispatch({ type: CONTACTS_ERROR, payload: error });
    return handleError(error);
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
    return handleError(error);
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
    return handleError(error);
  }
};
