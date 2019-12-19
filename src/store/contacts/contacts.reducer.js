import {
  GET_CONTACTS,
  GET_CONTACTS_SUCCESS,
  REMOVE_CONTACTS,
  ADD_CONTACTS
} from './contacts.types';

const initialState = {
  contactsList: [],
  fetching: false
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
        fetching: false
      };
    case REMOVE_CONTACTS:
      // eslint-disable-next-line no-case-declarations
      const contactsList = state.contactsList.filter(
        c => c.id !== action.payload
      );
      return {
        ...state,
        contactsList
      };
    case ADD_CONTACTS:
      return {
        ...state,
        contactsList: [...state.contactsList, action.payload]
      };
    default:
      return state;
  }
};
