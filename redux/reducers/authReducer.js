export const REGISTER_REQUEST = "REGISTER_REQUEST";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_ERROR = "REGISTER_ERROR";


const initialState = {
    error: {
        register: null
    },
    flage: {
        registerSuccess: false,
    },
};

export const AuthReducer = (state = initialState, action) => {
    switch (action.type) {

        case REGISTER_SUCCESS:
            return { ...state, flage: { registerSuccess: true } };
        case REGISTER_ERROR:
            return { ...state, error: { register: action.error } };
        default:
            return state;
    }

}; 