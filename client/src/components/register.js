import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { register } from "../actions/auth";
import { clearError, setError } from "../actions/error";

const Register = () => {

    // Get dispatch
    const dispatch = useDispatch();
    const history = useHistory();

    // Set state
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("")
    const [email, setEmail] = useState("");
    const [password, setPassowrd] = useState("");
    const [retypePassword, setRetypePassword] = useState("");
    const [successful, setSuccessful] = useState(false);

    // Get error from redux
    const error = useSelector(state => state.error);

    // Clear error on firstname, lastname, email, password, or retypepassword change
    useEffect(()=>{
        if(error) dispatch(clearError());
    }, [firstname, lastname, email, password, retypePassword])

    // Clear error on unmount
    useEffect(() => {
        return () => {
            if(error) dispatch(clearError());
        }
    }, [])

    // On Change listeners
    const onChangeFirstname = (e) => setFirstname(e.target.value);
    const onChangeLastname = (e) => setLastname(e.target.value);
    const onChangeEmail = (e) => setEmail(e.target.value);
    const onChangePassword = (e) => setPassowrd(e.target.value);
    const onChnageRetypePassword = (e) => setRetypePassword(e.target.value);
    
    // On register onClick
    const handleRegister = (e) => {
        e.preventDefault();
        setSuccessful(false);
        if(error) dispatch(clearError());

        if(password !== retypePassword){
            return dispatch(setError({msg:"The passwords do not match. Please try again."}))
        }
        
        // Dispatch register action and set successful state
        dispatch(register(firstname, lastname, email, password))
        .then(() => {
            setSuccessful(true);
            history.push("/login");
        })
        .catch(() => {
            setSuccessful(false);
        })
    } 
    
    return(
        <div className="register-card">
                <form className='form-container'>
                    <h1 className="title">Register</h1>
                    <div className="inputs"> 
                        <div className="name-inputs-container">
                            <input className="name-input" onChange={onChangeFirstname} placeholder="First Name"/>
                            <input className="name-input" onChange={onChangeLastname} placeholder="Last Name"/>
                        </div>
                        <div className="input-container">
                            <label className="label" ></label>
                            <input className='input' type="email" onChange={onChangeEmail} placeholder="E-mail"/>
                        </div>      
                        <div className="input-container">
                            <label className="label"></label>
                            <input className='input' type="password" onChange={onChangePassword} placeholder="Password"/>
                        </div>
                        <div className="input-container">
                            <label className="label"></label>
                            <input className='input' type="password" onChange={onChnageRetypePassword} placeholder="Re-type Password"/>
                        </div>
                    </div>

                    <div className="form-footer">
                        {error && 
                        <div className="error-container">
                            <p className="error-message">{error.msg}</p>
                        </div>}
                        
                        <div className="button-container">
                            <button className="button" onClick={handleRegister}>Register</button>
                        </div>

                        <div className="no-account">
                            <p>Already have an account? <Link to="/login" style={{textDecoration:"none", color:"darkorange"}}>Login</Link></p>
                        </div>
                    </div>
                    
                     
                </form>
                
        </div>
    )
    
}
export default Register;