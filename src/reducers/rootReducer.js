import { combineReducers } from 'redux'

import user from './user';
import notification from './notification';
import token from './token';
import login from "./login";

const rootReducer = combineReducers({
    user,
    notification,
    token,
    login,
});

export default rootReducer;