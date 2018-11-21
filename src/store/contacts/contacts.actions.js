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

    // setTimeout(() => {
    //   dispatch({
    //     type: GET_CONTACTS_SUCCESS,
    //     payload: response.data
    //   });
    // }, 3000)

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
    })
  } catch (error) {
    dispatch({ type: CONTACTS_ERROR, payload: error });
    return Promise.reject(error);
  }
};
