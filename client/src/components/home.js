import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { logout } from "../actions/auth";
import { clearError } from "../actions/error";
import NoteService from "../services/note";

const Home = () => {

    // Get dispatch and histpry
    const dispatch = useDispatch();
    const history = useHistory();
    const [notes, setNotes] = useState([]);

    // Set state
    
    // Get error from redux
    const error = useSelector(state => state.error);

    // Clear error on unmount
    useEffect(() => {
        NoteService.getNotes().then( (response) => {
                setNotes(response.data.notes);
            })

        return () => {
            if(error) dispatch(clearError());
        }
    }, [])

    // On Logout onClick
    const handleLogout = (e) => {
        e.preventDefault();

        dispatch(logout());
        history.push("/login");
    }
    
    return(
        <div className="home-container">
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}

export default Home;