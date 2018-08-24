import {
    USER_LOGGED_IN,
    USER_ATTESTED,
    USER_LOGGED_OUT
} from '../config/Actions'

const initialState = {
    credentials: null,
    loggedIn: false,
    loggedInAddress: null,
    attested: false,
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
            };

        case USER_ATTESTED:

            let credentials = state.credentials;
            credentials['cash36KYC'] = action.attest;

            return {
                ...state,
                credentials: credentials,
                attested: true,
            };

        case USER_LOGGED_OUT:
            return {
                ...state,
                credentials: null,
                loggedIn: false,
                loggedInAddress: null,
                lastLogin: new Date(),
            };

        default:
            return state;
    }
}

