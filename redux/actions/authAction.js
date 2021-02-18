import { REGISTER_REQUEST } from '../reducers/authReducer';

export const register = payload => ({
    type: REGISTER_REQUEST,
    payload,
}); 