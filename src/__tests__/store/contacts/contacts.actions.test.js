import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import mockAxios from 'axios';

import {
  GET_CONTACTS,
  GET_CONTACTS_SUCCESS,
  CONTACTS_ERROR,
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

test('dispatches getContacts action error', async () => {
  const error = new Error();
  mockAxios.get.mockImplementationOnce(() => Promise.reject(error));

  const store = mockStore();

  const expectedActions = [
    {
      type: GET_CONTACTS
    },
    {
      type: CONTACTS_ERROR,
      payload: error
    }
  ];

  try {
    await store.dispatch(getContacts());
  } catch (error) {
    expect(store.getActions()).toEqual(expectedActions);
    expect(mockAxios.get).toHaveBeenCalledTimes(1);
  }

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

test('dispatches removeContact action error', async () => {
  const id = '1';
  const error = new Error();

  mockAxios.delete.mockImplementationOnce(() => Promise.reject(error));

  const store = mockStore();

  const expectedActions = [
    {
      type: CONTACTS_ERROR,
      payload: error
    }
  ];

  try {
    await store.dispatch(removeContact(id));
  } catch (error) {
    expect(store.getActions()).toEqual(expectedActions);
    expect(mockAxios.delete).toHaveBeenCalledTimes(1);
  }

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

test('dispatches addContact action error', async () => {
  const newContact = { id: '1' };
  const error = new Error();

  mockAxios.post.mockImplementationOnce(() => Promise.reject(error));

  const store = mockStore();

  const expectedActions = [
    {
      type: CONTACTS_ERROR,
      payload: error
    }
  ];

  try {
    await store.dispatch(addContact(newContact));
  } catch (error) {
    expect(store.getActions()).toEqual(expectedActions);
    expect(mockAxios.post).toHaveBeenCalledTimes(1);
  }

  mockAxios.post.mockRestore();
});
