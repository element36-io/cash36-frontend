import {
  GET_CONTACTS,
  GET_CONTACTS_SUCCESS,
  CONTACTS_ERROR,
  REMOVE_CONTACTS,
  ADD_CONTACTS
} from './contacts.actions';

const initialState = {
  contactsList: [],
  fetching: false,
  error: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_CONTACTS:
      return {
        ...state,
        fetching: true
      };
    case GET_CONTACTS_SUCCESS:
      return {
        contactsList: action.payload,
        fetching: false,
        error: null
      };
    case CONTACTS_ERROR:
      return {
        ...state,
        feching: false,
        error: action.payload
      };
    case REMOVE_CONTACTS:
      const contactsList = state.contactsList.filter(c => c.id != action.payload)
      return {
        ...state,
        error: null,
        contactsList
      }
    default:
      return state;
  }
};
