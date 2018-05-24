import {
    INIT_NOTIFICATIONS,
    NEW_NOTIFICATION,
    RESET_BADGE_COUNT,
} from '../config/Actions'

const initialState = {
    notifications: [],
    badgeCount: 0,
    lastRead: new Date(),
};

export default (state = initialState, action) => {
    switch (action.type) {
        case INIT_NOTIFICATIONS:
            return {
                ...state,
                notifications: action.data,
                badgeCount: action.badgeCount,
            };

        case NEW_NOTIFICATION:

            let newNotification = {
                header: action.title,
                message: action.message,
                type: action.transferType,
                creationDate: action.creationDate,
                new: action.new,
            };

            let notifications = state.notifications;
            notifications.push(newNotification);

            let badgeCount = state.badgeCount;

            return {
                ...state,
                notifications,
                badgeCount: badgeCount + 1,
            };

        case RESET_BADGE_COUNT:

            let all = state.notifications;
            all.map(n => n.new = false);

            return {
                ...state,
                notifications: all,
                badgeCount: 0,
                lastRead: new Date(),
            };

        default:
            return state;
    }
}

