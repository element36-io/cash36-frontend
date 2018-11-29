import {
  GET_CONTACTS,
  GET_CONTACTS_SUCCESS,
  CONTACTS_ERROR,
  REMOVE_CONTACTS,
  ADD_CONTACTS,
  REMOVE_QUICK_TRANSFER,
  ADD_QUICK_TRANSFER
} from './contacts.actions';

const initialState = {
  contactsList: [],
  fetching: false,
  error: null,
  quickTransfer: null
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
      const contactsList = state.contactsList.filter(c => c.id !== action.payload);
      return {
        ...state,
        error: null,
        contactsList
      };
    case ADD_CONTACTS:
      return {
        contactsList: [
          ...state.contactsList,
          action.payload
        ],
        error: false
      };
    case ADD_QUICK_TRANSFER:
      return {
        ...state,
        quickTransfer: action.payload
      };
    case REMOVE_QUICK_TRANSFER:
      return {
        ...state,
        quickTransfer: null
      };
    default:
      return state;
  }
};
