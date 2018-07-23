import { CALL_API } from "../middleware/api";
import {
    INIT_NOTIFICATIONS_REQUEST,
    INIT_NOTIFICATIONS_SUCCESS,
    INIT_NOTIFICATIONS_ERROR,
    NEW_NOTIFICATION,
    UPDATE_BADGE_COUNT
} from '../config/Actions';

export function newNotification(title, message, type, creationDate) {
    return {
        type: NEW_NOTIFICATION,
        title: title,
        message: message,
        transferType: type,
        creationDate: creationDate,
        new: true,
    };
}

export function resetBadgeCount() {
    return {
        type: UPDATE_BADGE_COUNT,
        badgeCount: 0,
    };
}

export function updateBadgeCount(badgeCount) {
    return {
        type: UPDATE_BADGE_COUNT,
        badgeCount: badgeCount,
    };
}

export function init(lastRead) {
    return async (dispatch) => {
        const actionResponse = await dispatch({
            [ CALL_API ]: {
                endpoint: `/cash36/notifications`,
                authenticated: true,
                method: "GET",
                types: [ INIT_NOTIFICATIONS_REQUEST, INIT_NOTIFICATIONS_SUCCESS, INIT_NOTIFICATIONS_ERROR ]
            }
        });

        if (actionResponse.error) {
            throw new Error("Promise flow received action error", actionResponse);
        }

        let badgeCount = 0;
        actionResponse.payload.map(n => {
            n.new = lastRead < new Date(n.creationDate);
            if (lastRead < new Date(n.creationDate)) {
                badgeCount++;
            }
            return n;
        });
        await dispatch(updateBadgeCount(badgeCount));

        return actionResponse;
    };
}