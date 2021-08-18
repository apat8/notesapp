const authHeader = () => {
    const token = localStorage.getItem("token");
    if(!token) return {};

    return { Authorization: "Bearer " + token }
    
}

export default authHeader;