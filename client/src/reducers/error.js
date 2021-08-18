import {
   SET_ERROR,
   CLEAR_ERROR
} from "../actions/types";

const initialState = null;

const ErrorReducer =  (state = initialState, action) => {
    switch(action.type){
        case SET_ERROR:
            return {
                ...state,
                msg: action.payload.msg
            }
        case CLEAR_ERROR:
            return null;
        default:
            return state;
            
    }
}

export default ErrorReducer;