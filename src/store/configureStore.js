import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { createStore, applyMiddleware } from 'redux'
import rootReducer from '../reducers/rootReducer';
import throttle from 'lodash/throttle'

import { loadState, saveState } from "./localStorage";
const persistedState = loadState();

const loggerMiddleware = createLogger();

const configureStore = createStore(
    rootReducer,
    persistedState,
    applyMiddleware(
        thunkMiddleware,
        loggerMiddleware
    )
)

configureStore.subscribe(throttle(() => {
    saveState({
        user: configureStore.getState().user
    });
}, 1000));

export default configureStore;