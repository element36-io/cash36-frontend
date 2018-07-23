import { API_ROOT } from "../config/Api";


function callApi(endpoint, authenticated) {

    let config = {};

    if (authenticated) {
        let token = localStorage.getItem('access_token') || null;
        let refreshToken = localStorage.getItem('refresh_token') || null;
        let expiresAt = localStorage.getItem('expires_at') || null;

        // if expired, try to refresh
        if (token && new Date().getTime() > expiresAt) {
            // Refresh Token
            let config = {
                method: 'POST',
                headers: new Headers({
                    'Authorization': 'Basic Y2FzaDM2LWNsaWVudDpjYXNoMzYtc2VjcmV0',
                    'Content-Type': 'application/x-www-form-urlencoded'
                }),
                body: `grant_type=refresh_token&refresh_token=${refreshToken}`
            };
            fetch(`${API_ROOT}/oauth/token`, config)
                .then(response =>
                    response.json().then(json => ({ json, response }))
                ).then(({ json, response }) => {
                if (!response.ok) {
                    return Promise.reject(json);
                }
                // If refersh was successful, override the token in local storage
                console.log('token refreshed');
                localStorage.setItem('access_token', json.access_token);
                localStorage.setItem('refresh_token', json.refresh_token);
                localStorage.setItem('expires_at', new Date().getTime() + (json.expires_in * 1000));
                return token;
            }).catch(err => console.log(err))

            token = localStorage.getItem('access_token') || null;
            expiresAt = localStorage.getItem('expires_at') || null;
        }

        // check for valid token
        if (token && new Date().getTime() < expiresAt) {
            config = {
                headers: { 'Authorization': `Bearer ${token}` }
            }
        } else {
            throw new Error("No valid token!");
        }
    }

    return fetch(API_ROOT + endpoint, config)
        .then(response =>
            response.json().then(json => ({ json, response }))
        ).then(({ json, response }) => {
            if (!response.ok) {
                return Promise.reject(json);
            }
            return json;
        }).catch(err => console.log(err))
}

export const CALL_API = Symbol('Call API');

export const api = store => next => action => {

    const callAPI = action[ CALL_API ];

    // So the middleware doesn't get applied to every single action
    if (typeof callAPI === 'undefined') {
        return next(action)
    }

    let { endpoint, types, authenticated } = callAPI;

    const [ requestType, successType, errorType ] = types;

    store.dispatch({ type: requestType });

    return callApi(endpoint, authenticated).then(
        response =>
            next({
                payload: response,
                type: successType
            }),
        error => next({
            error: error.message || 'There was an error.',
            type: errorType
        })
    ).catch(err => {
        throw new Error("No token saved or token expired!");
    })
}