import { combineReducers } from "redux";

import AuthReducer from "./auth";
import ErrorReducer from "./error";

export default combineReducers({
    auth: AuthReducer,
    error: ErrorReducer
})

