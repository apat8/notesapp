import React from "react";
import { Route, Redirect } from "react-router-dom";
import AuthService from "../services/auth";

const ProtectedRoute = ({children, ...rest}) => {

    const isAuthenticated = AuthService.isAuthenticated();

    return(
        <Route {...rest} render={({location}) => {
                return isAuthenticated 
                ? children 
                : <Redirect to = {{ 
                    pathname: "/login",
                    state: {from: location}}} />
            }
        }/>
    )
}

export default ProtectedRoute;