import { CALL_API } from '../middleware/api.middleware';

// NOTIFICATION
export const INIT_NOTIFICATIONS_REQUEST = 'INIT_NOTIFICATIONS_REQUEST';
export const INIT_NOTIFICATIONS_SUCCESS = 'INIT_NOTIFICATIONS_SUCCESS';
export const INIT_NOTIFICATIONS_ERROR = 'INIT_NOTIFICATIONS_ERROR';
export const NEW_NOTIFICATION = 'NEW_NOTIFICATION';
export const UPDATE_BADGE_COUNT = 'UPDATE_BADGE_COUNT';

export function newNotification (title, message, type, creationDate) {
  return {
    type: NEW_NOTIFICATION,
    title: title,
    message: message,
    transferType: type,
    creationDate: creationDate,
    new: true
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

    console.log(actionResponse);

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
