import {
    USER_LOGGED_IN,
    USER_LOGGED_OUT
} from '../config/Actions';


export function userLoggedIn(credentials, userAddress) {
    return {
        type: USER_LOGGED_IN,
        credentials: credentials,
        loggedInAddress: userAddress
    };
}

export function userLoggedOut() {
    return {
        type: USER_LOGGED_OUT
    };
}

export function logout(web3) {
    return async (dispatch) => {
        try {
            web3.eth.accounts.wallet.clear();
            dispatch(userLoggedOut());
        } catch (error) {
            console.log(error)
        }
        return Promise.resolve();
    };
}