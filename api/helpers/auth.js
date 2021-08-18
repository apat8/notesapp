const jwt = require('jsonwebtoken');

module.exports.auth = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    if(authHeader){
        const bearerToken = authHeader.split(' ')[1];
        try{
            const user = jwt.verify(bearerToken, process.env.JWT_SECRET);
            req.user = user;
            next();
        }catch(error) {
            return res.status(401).json({ message: "Authentication failed!" });
        }
    }
    else{
        return res.status(401).json({ message: "Authentication failed!" });
    }
    
}

module.exports.generateToken = (user) => {
    const token = jwt.sign({
        email: user.email,
        userId: user._id
    }, process.env.JWT_SECRET, {expiresIn:"1h"})

    if(!token) throw Error("Authentication Error");

    return token;
}