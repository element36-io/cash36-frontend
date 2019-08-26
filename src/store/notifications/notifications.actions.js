import API from '../../config/api';
import {
  FETCH_NOTIFICATIONS,
  UPDATE_BADGE_COUNT,
  UPDATE_LAST_READ
} from './notifications.types';

export const resetBadgeCount = () => {
  return {
    type: UPDATE_BADGE_COUNT,
    payload: 0
  };
};

export const updateBadgeCount = badgeCount => {
  return {
    type: UPDATE_BADGE_COUNT,
    payload: badgeCount
  };
};

export const updateLastRead = lastRead => {
  return {
    type: UPDATE_LAST_READ,
    payload: lastRead
  };
};

export const fetchNotifications = () => {
  return async dispatch => {
    const response = await API.get('/exchange/notifications');
    dispatch({
      type: FETCH_NOTIFICATIONS,
      payload: response.data
    });

    if (response.error) return;

    const lastRead = localStorage.getItem('lastRead');
    let badgeCount = 0;
    response.data.map(n => {
      const isNew =
        new Date(lastRead).getTime() < new Date(n.creationDate).getTime();
      if (isNew) {
        badgeCount++;
      }
      return n;
    });

    dispatch(updateBadgeCount(badgeCount));
  };
};
