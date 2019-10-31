import contactsReducer from '../../../store/contacts/contacts.reducer';
import {
  GET_CONTACTS,
  GET_CONTACTS_SUCCESS,
  ADD_CONTACTS,
  REMOVE_CONTACTS
} from '../../../store/contacts/contacts.types';

const initialState = {
  contactsList: [],
  fetching: false
};

test('updates the state after GET_CONTACTS was dispatched', () => {
  const action = {
    type: GET_CONTACTS
  };

  const state = contactsReducer(initialState, action);

  expect(state).toEqual({
    ...initialState,
    fetching: true
  });
});

test('updates the state after GET_CONTACTS_SUCCESS was dispatched', () => {
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

test('updates the state after REMOVE_CONTACTS was dispatched', () => {
  const initialState = {
    contactsList: [{ id: '1' }, { id: '2' }],
    fetching: false
  };

  const contactIdToRemove = '2';

  const action = {
    type: REMOVE_CONTACTS,
    payload: contactIdToRemove
  };

  const state = contactsReducer(initialState, action);

  expect(state).toEqual({
    ...initialState,
    contactsList: [{ id: '1' }]
  });
});

test('updates the state after ADD_CONTACTS was dispatched', () => {
  const initialState = {
    contactsList: [{ id: '1' }, { id: '2' }],
    fetching: false
  };

  const newContact = { id: '3' };

  const action = {
    type: ADD_CONTACTS,
    payload: newContact
  };

  const state = contactsReducer(initialState, action);

  expect(state).toEqual({
    ...initialState,
    contactsList: [...initialState.contactsList, newContact]
  });
});
