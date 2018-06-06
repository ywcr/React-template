// store.js
import {createStore,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {rootReducer} from '../reducers';
import api from '../middleware/api'

export const store = createStore(
    rootReducer,
    applyMiddleware(thunk,api)
)