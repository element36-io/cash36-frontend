import _ from 'lodash';
import {
  INIT_NOTIFICATIONS_REQUEST,
  INIT_NOTIFICATIONS_SUCCESS,
  INIT_NOTIFICATIONS_ERROR,
  NEW_NOTIFICATION,
  UPDATE_BADGE_COUNT
} from './notifications.actions';

const initialState = {
  notifications: null,
  isFetching: false,
  error: '',
  badgeCount: 0,
  lastRead: new Date()
};

export default (state = initialState, action) => {
  switch (action.type) {
    case INIT_NOTIFICATIONS_REQUEST:
      return {
        ...state,
        isFetching: true
      };

    case INIT_NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        notifications: _.orderBy(action.payload, ['creationDate'], 'desc')
      };

    case INIT_NOTIFICATIONS_ERROR:
      return {
        ...state,
        isFetching: false,
        error: action.error
      };

    case NEW_NOTIFICATION:
      let newNotification = {
        ...action.payload
      };

      let notifications = state.notifications;
      notifications.unshift(newNotification);

      let badgeCount = state.badgeCount;

      return {
        ...state,
        notifications,
        badgeCount: badgeCount + 1
      };

    case UPDATE_BADGE_COUNT:
      return {
        ...state,
        badgeCount: action.badgeCount,
        lastRead: new Date()
      };

    default:
      return state;
  }
};
