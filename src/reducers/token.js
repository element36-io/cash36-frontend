import {
    UPDATE_TOKENS,
} from '../config/Actions'

const initialState = {
    tokens: [],
};

export default (state = initialState, action) => {
    switch (action.type) {

        case UPDATE_TOKENS:

            return {
                ...state,
                tokens: action.data,
            };
            
        default:
            return state;
    }
}

