import {
    INIT_NOTIFICATIONS,
    NEW_NOTIFICATION,
    RESET_BADGE_COUNT
} from '../config/Actions';

export function initNotifications(data, badgeCount) {
    return {
        type: INIT_NOTIFICATIONS,
        data: data,
        badgeCount: badgeCount,
    };
}

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
        type: RESET_BADGE_COUNT
    };
}

export function init(backendUrl, loggedInAddress, lastRead) {
    return async (dispatch) => {
        try {
            // Load notifications from backend
            fetch(`${backendUrl}/notifications/${loggedInAddress}`)
                .then((response) => {
                    return response.json();
                }).then((data) => {
                    let badgeCount = 0;
                    data.map(n => {
                        n.new = lastRead < new Date(n.creationDate);
                        if (lastRead < new Date(n.creationDate)) {
                            badgeCount++;
                        }
                        return n;
                    });
                    dispatch(initNotifications(data, badgeCount));
            });
        } catch (error) {
            console.log(error)
        }
        return Promise.resolve();
    };
}