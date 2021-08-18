import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const Main = () => {

    // Get dispatch and histpry
    const dispatch = useDispatch();
    const history = useHistory();
    const [notes, setNotes] = useState([]);

    // Clear error on unmount
    useEffect(() => {
       
    }, [])

    // On Login onClick
    const handleLogin = (e) => {
        e.preventDefault();
        history.push("/login");
    }

    // On Register onClick
    const handleRegister = (e) => {
        e.preventDefault();
        history.push("/register");
    }
    
    return(
        <div className="main-container">

            <h1 className="main-title">Notes</h1>
            <div className="main-buttons">
                <div className="button-container">
                    <button className="button" onClick={handleLogin}>Login</button>
                </div>
                <div className="button-container">
                    <button className="button" onClick={handleRegister}>Register</button>
                </div>
            </div>
            
            
        </div>
    )
}

export default Main;