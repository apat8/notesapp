import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";
import { login } from "../actions/auth";
import { clearError } from "../actions/error";
import "../App.css";

const Login = () => {

    // Get dispatch, history and location
    const dispatch = useDispatch();
    const history = useHistory();
    const { state } = useLocation();

    // Set state
    const [email, setEmail] = useState("");
    const [password, setPassowrd] = useState("");
    const [successful, setSuccessful] = useState(false);
    
    // Get error from redux
    const error = useSelector(state => state.error);

    // Clear error on email or password
    useEffect(()=>{
        if(error) dispatch(clearError());
    }, [email, password])

    // Clear error on unmount
    useEffect(() => {
        return () => {
            if(error) dispatch(clearError());
        }
    }, [])

    // On Change listners
    const onChangeEmail = (e) => setEmail(e.target.value);
    const onChangePassword = (e) => setPassowrd(e.target.value);

    // On Login onClick
    const handleLogin = (e) => {
        e.preventDefault();
        if(error) dispatch(clearError());

        setSuccessful(false);
        
        dispatch(login(email, password))
        .then(() => {
            setSuccessful(true);
            history.push(state?.from || "/home");
        })
        .catch(()=>{
            setSuccessful(false);
        })
    } 
    
    return(
        <div className='card'>
                <form className='form-container'>
                    <h1 className="title">Login</h1>

                    <div className="inputs"> 
                        <div className="input-container">
                            <label className="label" ></label>
                            <input className='input' type="email" onChange={onChangeEmail} placeholder="E-mail"/>
                        </div>      
                        <div className="input-container">
                            <label className="label"></label>
                            <input className='input' type="password" onChange={onChangePassword} placeholder="Password"/>
                        </div>
                    </div>

                    <div className="form-footer">
                        {error && 
                        <div className="error-container">
                            <p className="error-message">{error.msg}</p>
                        </div>}
                        
                        <div className="button-container">
                            <button className="button" onClick={handleLogin}>Login</button>
                        </div>

                        <div className="no-account">
                            <p>Don't have an account? <Link to="/register" style={{textDecoration:"none", color:"darkorange"}}>Register</Link></p>
                        </div>
                    </div>
                    
                     
                </form>
                
        </div>
    )
}

export default Login;