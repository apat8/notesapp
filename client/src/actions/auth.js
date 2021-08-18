import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT
} from "./types";

import AuthService from "../services/auth";
import { setError } from "./error";

export const register = (firstname, lastname, email, password) => (dispatch) => {
    return AuthService.register(firstname, lastname, email, password)
    .then((response) => {
            dispatch({type: REGISTER_SUCCESS, payload: response.data});
            return Promise.resolve();
        }
    )
    .catch((error) => {
        dispatch({type: REGISTER_FAIL});
        dispatch(setError(getError(error)));
        return Promise.reject();
    })
}

export const login = (email, password) => (dispatch) => {
    return AuthService.login(email, password)
    .then((response)=>{
        dispatch({type: LOGIN_SUCCESS, payload: response.data})
        return Promise.resolve();
    })
    .catch((error) => {
        dispatch({type: LOGIN_FAIL})
        dispatch(setError(getError(error)));
        return Promise.reject();
    });
}

export const logout = () => (dispatch) => {
    dispatch({type: LOGOUT});
}

// Get error from response
const getError = (error) => {
    if(error.response && error.response.data) {
        return error.response.data;
    }
    else if (error.message){
        return {msg: error.message};
    }
    else{
        return {msg: error.toString()}
    }
}