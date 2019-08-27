import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import mockAxios from 'axios';

import {
  FETCH_NOTIFICATIONS,
  UPDATE_BADGE_COUNT,
  UPDATE_LAST_READ
} from '../../../store/notifications/notifications.types';

import {
  resetBadgeCount,
  updateBadgeCount,
  updateLastRead,
  fetchNotifications
} from '../../../store/notifications/notifications.actions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

test('dispatches resetBadgeCount', () => {
  const store = mockStore();
  const expectedActions = [
    {
      type: UPDATE_BADGE_COUNT,
      payload: 0
    }
  ];

  store.dispatch(resetBadgeCount());

  expect(store.getActions()).toEqual(expectedActions);
});

test('dispatches updateBadgeCount', () => {
  const store = mockStore();
  const expectedActions = [
    {
      type: UPDATE_BADGE_COUNT,
      payload: 1
    }
  ];

  store.dispatch(updateBadgeCount(1));

  expect(store.getActions()).toEqual(expectedActions);
});

test('dispatches updateLastRead', () => {
  const store = mockStore();
  const expectedActions = [
    {
      type: UPDATE_LAST_READ,
      payload: 'lastRead'
    }
  ];

  store.dispatch(updateLastRead('lastRead'));

  expect(store.getActions()).toEqual(expectedActions);
});

test('dispatches fetchNotifications success', async () => {
  const notifications = [
    {
      creationDate: '2018-08-26T08:53:23.432+0000',
      header: 'Verification successful',
      message: '',
      type: 'TIER_2_CONFIRMED'
    }
  ];

  mockAxios.get.mockImplementationOnce(() =>
    Promise.resolve({ data: notifications })
  );

  const store = mockStore();

  const expectedActions = [
    {
      type: FETCH_NOTIFICATIONS,
      payload: notifications
    },
    {
      type: UPDATE_BADGE_COUNT,
      payload: 1
    }
  ];

  await store.dispatch(fetchNotifications());

  expect(store.getActions()).toEqual(expectedActions);
  expect(mockAxios.get).toHaveBeenCalledTimes(1);
  mockAxios.get.mockRestore();
});

test('dispatches fetchNotifications error', async () => {
  const error = new Error();
  mockAxios.get.mockImplementationOnce(() => Promise.reject(error));

  const store = mockStore();

  const expectedActions = [];

  try {
    await store.dispatch(fetchNotifications());
  } catch (error) {
    expect(store.getActions()).toEqual(expectedActions);
    expect(mockAxios.get).toHaveBeenCalledTimes(1);
  }

  mockAxios.get.mockRestore();
});
