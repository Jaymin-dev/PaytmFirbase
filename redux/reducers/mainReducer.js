import { combineReducers } from 'redux';
import { AuthReducer } from './authReducer';

export const combinedReducers = combineReducers({
    blank: (state, action) => {
        if (state == null) {
            state = [];
        }
        return state;
    },
    auth: AuthReducer,
});