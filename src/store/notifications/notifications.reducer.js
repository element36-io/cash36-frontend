import _ from 'lodash';
import {
  FETCH_NOTIFICATIONS,
  UPDATE_BADGE_COUNT,
  UPDATE_LAST_READ
} from './notifications.types';

// Maybe store last read on backend ?
const initialState = {
  notifications: [],
  badgeCount: 0,
  lastRead: localStorage.getItem('lastRead')
    ? new Date(localStorage.getItem('lastRead')).toISOString()
    : new Date().toISOString()
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_NOTIFICATIONS:
      return {
        ...state,
        notifications: _.orderBy(action.payload, ['creationDate'], 'desc')
      };
    case UPDATE_BADGE_COUNT:
      return {
        ...state,
        badgeCount: action.payload
      };

    case UPDATE_LAST_READ:
      return {
        ...state,
        lastRead: action.payload
      };

    default:
      return state;
  }
};
