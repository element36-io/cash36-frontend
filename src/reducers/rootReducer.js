import { combineReducers } from 'redux'

import user from './user';
import notification from './notification';
import token from './token';

const rootReducer = combineReducers({
    user,
    notification,
    token,
});

export default rootReducer;