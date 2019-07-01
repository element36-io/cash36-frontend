import API from '../../config/api';
export const FETCH_NOTIFICATIONS = 'FETCH_NOTIFICATIONS';
export const UPDATE_BADGE_COUNT = 'UPDATE_BADGE_COUNT';
export const UPDATE_LAST_READ = 'UPDATE_LAST_READ';

export function resetBadgeCount () {
  return {
    type: UPDATE_BADGE_COUNT,
    badgeCount: 0
  };
}

export function updateBadgeCount (badgeCount) {
  return {
    type: UPDATE_BADGE_COUNT,
    badgeCount: badgeCount
  };
}

export function updateLastRead (lastRead) {
  return {
    type: UPDATE_LAST_READ,
    lastRead
  };
}

export function fetchNotifications () {
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
}
