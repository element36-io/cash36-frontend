import {
    UPDATE_TOKENS,
} from '../config/Actions';

export function updateTokens(data) {
    return {
        type: UPDATE_TOKENS,
        data: data
    };
}

export function update(backendUrl, loggedInAddress) {
    return async (dispatch) => {
        try {
            fetch(`${backendUrl}/tokens`).then(results => {
                return results.json();
            }).then(data => {
                if (loggedInAddress) {
                    // Fetch user balance for all tokens
                    Promise.all(data.map(async (token) => {
                        let balance = await fetch(`${backendUrl}/tokens/${token.symbol}/balance?userAddress=${loggedInAddress}`);
                        balance = await balance.json();
                        token.balance = balance;
                        return token;
                    })).then(data => {
                        dispatch(updateTokens(data));
                    });
                } else {
                    dispatch(updateTokens(data));
                }
            });
        } catch (error) {
            console.log(error)
        }
        return Promise.resolve();
    };
}