import axios from "axios";
import authHeader from "./authheader";

const API_URL = "http://localhost:3000/api/notes/";

const getNotes = () => {
    return axios.get(API_URL, { headers: authHeader() });
}

const NoteService = {
    getNotes
}

export default NoteService;