import React from "react";
import { Route, Redirect } from "react-router-dom";
import AuthService from "../services/auth";

const PublicRoute = ({children, ...rest}) => {

    const isAuthenticated = AuthService.isAuthenticated();
    
    return(
        <Route {...rest} render={({location}) => {
                return isAuthenticated 
                ? <Redirect to = {{ 
                    pathname: "/home",
                    state: {from: location}}} /> 
                : children
            }
        }/>
    )
}

export default PublicRoute;