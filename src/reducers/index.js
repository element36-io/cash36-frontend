import { combineReducers } from 'redux'

import userReducer from './user'
import notificationReducer from './notification'
import tokenReducer from './token'
import authReducer from './auth'

const rootReducer = combineReducers({
  user: userReducer,
  notification: notificationReducer,
  token: tokenReducer,
  auth: authReducer
})

export default rootReducer
