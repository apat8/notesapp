import axios from "axios";

const API_URL = "http://localhost:3000/api/users/";

const register = (firstname, lastname, email, password) => {
    return axios.post(API_URL + "register", {
        firstname,
        lastname,
        email,
        password
    })
}

const login = (email, password) => {
    return axios.post(API_URL + "login", {
        email,
        password
    })
}

const logout = () => {
    localStorage.removeItem("token");
}

const isAuthenticated = () => {
    return localStorage.getItem("token");
}

const AuthService = {
    register,
    login,
    logout,
    isAuthenticated
}

export default AuthService;