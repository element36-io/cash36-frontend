import contactsReducer from '../../../store/contacts/contacts.reducer';
import {
  GET_CONTACTS,
  GET_CONTACTS_SUCCESS,
  CONTACTS_ERROR,
  ADD_CONTACTS,
  REMOVE_CONTACTS
} from '../../../store/contacts/contacts.types';

const initialState = {
  contactsList: [],
  fetching: false,
  error: null
};

test('updates the state after GET_CONTACTS was called', () => {
  const action = {
    type: GET_CONTACTS
  };

  const state = contactsReducer(initialState, action);

  expect(state).toEqual({
    ...initialState,
    fetching: true
  });
});

test('updates the state after GET_CONTACTS_SUCCESS was called', () => {
  const contacts = [{ id: '1' }, { id: '2' }];

  const action = {
    type: GET_CONTACTS_SUCCESS,
    payload: contacts
  };

  const state = contactsReducer(initialState, action);

  expect(state).toEqual({
    ...initialState,
    fetching: false,
    contactsList: contacts
  });
});

test('updates the state after CONTACTS_ERROR was called', () => {
  const error = {
    message: 'error message'
  };

  const action = {
    type: CONTACTS_ERROR,
    payload: error
  };

  const state = contactsReducer(initialState, action);

  expect(state).toEqual({
    ...initialState,
    fetching: false,
    error: error
  });
});

test('updates the state after REMOVE_CONTACTS was called', () => {
  const initialState = {
    contactsList: [{ id: '1' }, { id: '2' }],
    fetching: false,
    error: null
  };

  const contactIdToRemove = '2';

  const action = {
    type: REMOVE_CONTACTS,
    payload: contactIdToRemove
  };

  const state = contactsReducer(initialState, action);

  expect(state).toEqual({
    ...initialState,
    error: null,
    contactsList: [{ id: '1' }]
  });
});

test('updates the state after ADD_CONTACTS was called', () => {
  const initialState = {
    contactsList: [{ id: '1' }, { id: '2' }],
    fetching: false,
    error: null
  };

  const newContact = { id: '3' };

  const action = {
    type: ADD_CONTACTS,
    payload: newContact
  };

  const state = contactsReducer(initialState, action);

  expect(state).toEqual({
    ...initialState,
    contactsList: [...initialState.contactsList, newContact],
    error: false
  });
});
