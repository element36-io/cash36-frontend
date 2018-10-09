import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import throttle from 'lodash/throttle'
import { loadState, saveState } from './localStorage'
import authReducer from './auth/auth.reducer'
const persistedState = loadState()

const loggerMiddleware = createLogger()

const reducers = combineReducers({
    auth: authReducer
})

const store = createStore(
  reducers,
  persistedState,
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware
  )
)

store.subscribe(throttle(() => {
  saveState({
    user: store.getState().user
  })
}, 1000))

export default store
