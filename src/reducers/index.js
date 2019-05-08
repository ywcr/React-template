// reducer/index.js
import {combineReducers} from 'redux';
import notes from './notes';
import users from './users';
import order from './order';

export const rootReducer = combineReducers({
    notes,
    users,
    order
});
