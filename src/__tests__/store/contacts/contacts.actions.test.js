import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import mockAxios from 'axios';

import {
  GET_CONTACTS,
  GET_CONTACTS_SUCCESS,
  ADD_CONTACTS,
  REMOVE_CONTACTS
} from '../../../store/contacts/contacts.types';

import {
  getContacts,
  removeContact,
  addContact
} from '../../../store/contacts/contacts.actions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

test('dispatches getContacts action success', async () => {
  const contacts = [{ id: '1' }, { id: '2' }];

  mockAxios.get.mockImplementationOnce(() =>
    Promise.resolve({ data: contacts })
  );

  const store = mockStore();

  const expectedActions = [
    {
      type: GET_CONTACTS
    },
    {
      type: GET_CONTACTS_SUCCESS,
      payload: contacts
    }
  ];

  await store.dispatch(getContacts());

  expect(store.getActions()).toEqual(expectedActions);
  expect(mockAxios.get).toHaveBeenCalledTimes(1);
  mockAxios.get.mockRestore();
});

test('dispatches removeContact action success', async () => {
  const id = '1';

  mockAxios.delete.mockImplementationOnce(() => Promise.resolve());

  const store = mockStore();

  const expectedActions = [
    {
      type: REMOVE_CONTACTS,
      payload: id
    }
  ];

  await store.dispatch(removeContact(id));

  expect(store.getActions()).toEqual(expectedActions);
  expect(mockAxios.delete).toHaveBeenCalledTimes(1);
  mockAxios.delete.mockRestore();
});

test('dispatches addContact action success', async () => {
  const newContact = { id: '1' };

  mockAxios.post.mockImplementationOnce(() =>
    Promise.resolve({
      data: newContact
    })
  );

  const store = mockStore();

  const expectedActions = [
    {
      type: ADD_CONTACTS,
      payload: newContact
    }
  ];

  await store.dispatch(addContact(newContact));

  expect(store.getActions()).toEqual(expectedActions);
  expect(mockAxios.post).toHaveBeenCalledTimes(1);
  mockAxios.post.mockRestore();
});
