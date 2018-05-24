import {
    USER_LOGGED_IN,
    USER_LOGGED_OUT
} from '../config/Actions'

const initialState = {
    credentials: null,
    loggedIn: false,
    loggedInAddress: null
}

export default (state = initialState, action) => {
    switch (action.type) {
        case USER_LOGGED_IN:
            return {
                ...state,
                credentials: action.credentials,
                loggedIn: true,
                loggedInAddress: action.loggedInAddress,
                lastLogin: new Date(),
            }

        case USER_LOGGED_OUT:
            return {
                ...state,
                credentials: null,
                loggedIn: false,
                loggedInAddress: null,
                lastLogin: new Date(),
            }

        default:
            return state;
    }
}

