import _ from 'lodash';
import notificationsReducer from '../../../store/notifications/notifications.reducer';
import {
  FETCH_NOTIFICATIONS,
  UPDATE_BADGE_COUNT,
  UPDATE_LAST_READ
} from '../../../store/notifications/notifications.types';

const initialState = {
  notifications: [],
  badgeCount: 0,
  lastRead: '2018-08-26T08:53:23.432+0000'
};

test('updates the state after FETCH_NOTIFICATIONS was dispatched', () => {
  const notifications = [
    {
      creationDate: '2018-08-26T08:53:23.432+0000',
      header: 'Verification successful',
      message: '',
      type: 'TIER_2_CONFIRMED'
    },
    {
      creationDate: '2019-08-26T08:53:23.432+0000',
      header: 'Verification unsuccessful',
      message: '',
      type: 'TIER_2_DENIED'
    }
  ];

  const action = {
    type: FETCH_NOTIFICATIONS,
    payload: notifications
  };

  const state = notificationsReducer(initialState, action);

  expect(state).toEqual({
    ...initialState,
    notifications: _.orderBy(notifications, ['creationDate'], 'desc')
  });
});

test('updates the state after UPDATE_BADGE_COUNT was dispatched', () => {
  const action = {
    type: UPDATE_BADGE_COUNT,
    payload: 1
  };

  const state = notificationsReducer(initialState, action);

  expect(state).toEqual({
    ...initialState,
    badgeCount: action.payload
  });
});

test('updates the state after UPDATE_LAST_READ was dispatched', () => {
  const action = {
    type: UPDATE_LAST_READ,
    payload: '2017-08-26T08:53:23.432+0000'
  };

  const state = notificationsReducer(initialState, action);

  expect(state).toEqual({
    ...initialState,
    lastRead: action.payload
  });
});
