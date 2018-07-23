import { API_ROOT} from "../config/Api";
import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS } from "../config/Actions";

export function requestLogin(creds) {
    return {
        type: LOGIN_REQUEST,
        isFetching: true,
        isAuthenticated: false,
        creds
    }
}

export function receiveLogin(user) {
    return {
        type: LOGIN_SUCCESS,
        isFetching: false,
        isAuthenticated: true,
        id_token: user.id_token
    }
}

export function loginError(message) {
    return {
        type: LOGIN_FAILURE,
        isFetching: false,
        isAuthenticated: false,
        message
    }
}

// Calls the API to get a token and
// dispatches actions along the way
export function requestToken(username, password) {
    let config = {
        method: 'POST',
        headers: new Headers({
            'Authorization': 'Basic Y2FzaDM2LWNsaWVudDpjYXNoMzYtc2VjcmV0',
            'Content-Type': 'application/x-www-form-urlencoded'
        }),
        body: `username=${username}&password=${password}&grant_type=password`
    };

    return async dispatch => {
        dispatch(requestLogin({username: username, password: password}));

        return fetch(`${API_ROOT}/oauth/token`, config)
            .then(response =>
                response.json().then(token => ({ token, response }))
            ).then(({ token, response }) =>  {
                if (!response.ok) {
                    // If there was a problem, we want to
                    // dispatch the error condition
                    console.log(token, response);
                    localStorage.setItem('access_token', undefined);
                    dispatch(loginError(token.error_description));
                    return Promise.reject(token);
                } else {
                    // If login was successful, set the token in local storage
                    localStorage.setItem('access_token', token.access_token);
                    localStorage.setItem('refresh_token', token.refresh_token);
                    let expiresAt = new Date().getTime() + (token.expires_in * 1000);
                    localStorage.setItem('expires_at', expiresAt);
                    dispatch(receiveLogin(token));
                    return token;
                }
            }).catch(err => {
                console.log("Error: ", err);
            });
    }
}