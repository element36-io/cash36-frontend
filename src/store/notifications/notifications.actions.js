import moment from 'moment';
import API from '../../config/api';
import {
  FETCH_NOTIFICATIONS,
  UPDATE_BADGE_COUNT,
  UPDATE_LAST_READ
} from './notifications.types';
import { handleError } from '../../helpers/error.helpers';

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

export const fetchNotifications = () => async dispatch => {
  try {
    const response = await API.get('/exchange/notifications');

    dispatch({
      type: FETCH_NOTIFICATIONS,
      payload: response.data
    });
    const lastRead = moment(localStorage.getItem('lastRead'));
    let badgeCount = 0;

    response.data.forEach(n => {
      const isNew = lastRead.isSameOrBefore(n.creationDate);

      if (isNew) badgeCount++;
    });

    dispatch(updateBadgeCount(badgeCount));
  } catch (error) {
    return handleError(error);
  }
};
