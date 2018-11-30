import { CALL_API } from '../middleware/api.middleware';

export const INIT_NOTIFICATIONS_REQUEST = 'INIT_NOTIFICATIONS_REQUEST';
export const INIT_NOTIFICATIONS_SUCCESS = 'INIT_NOTIFICATIONS_SUCCESS';
export const INIT_NOTIFICATIONS_ERROR = 'INIT_NOTIFICATIONS_ERROR';
export const NEW_NOTIFICATION = 'NEW_NOTIFICATION';
export const UPDATE_BADGE_COUNT = 'UPDATE_BADGE_COUNT';
export const UPDATE_LAST_READ = 'UPDATE_LAST_READ';

export function newNotification (payload) {
  return {
    type: NEW_NOTIFICATION,
    payload
  };
}

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

export function fetchNotifications (lastRead) {
  return async (dispatch) => {
    const actionResponse = await dispatch({
      [CALL_API]: {
        url: `/cash36/notifications`,
        method: 'GET',
        types: [INIT_NOTIFICATIONS_REQUEST, INIT_NOTIFICATIONS_SUCCESS, INIT_NOTIFICATIONS_ERROR]
      }
    });

    if (actionResponse.error) return;

    let badgeCount = 0;
    actionResponse.payload.map(n => {
      n.new = lastRead < new Date(n.creationDate);
      if (lastRead < new Date(n.creationDate)) {
        badgeCount++;
      }
      return n;
    });

    await dispatch(updateBadgeCount(badgeCount));
  };
}
