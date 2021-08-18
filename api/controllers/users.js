const bcrypt = require('bcrypt');
const User = require("../models/user");
const {generateToken} = require("../helpers/auth");

exports.registerUser = (req, res) => {
        
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        if(!hash) throw Error("Registration Failed");

        const user = new User({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            password: hash
        })

        user.save().then(result => {
            if(!result) throw Error("Registration Failed");

            const token = generateToken(result.toObject());
            
            const {password, ...userWithoutPass} = result.toObject();

            return res.status(201).json({
                token: token,
                user: userWithoutPass,
                msg: "User successfully created"
            });
        }).catch(err => {
            return res.status(500).json({
                msg: err.message
            });
        })

    }).catch(err => {
        return res.status(500).json({
            msg: err.message
        });
    });
}

exports.loginUser = (req, res) => {
    User.findOne({
        email: req.body.email
    }, {}, {lean:true}).then(user => {
        if(!user) throw Error("Invalid email and/or password");

        bcrypt.compare(req.body.password, user.password)
            .then(result => {
                if(!result) throw Error("Invalid email and/or password");

               const token = generateToken(user);
                
                const {password, ...userWithoutPass} = user;

                res.status(200).json({
                    token: token,
                    user: userWithoutPass,
                    msg: "Authentication Successfull"
                })

            })
            .catch(err => {
                return res.status(401).json({
                    msg: err.message
                });
            })
    }).catch(err => {
        return res.status(401).json({
            msg: err.message
        });
    })
}

exports.deleteUser = (req, res) => {
    User.findByIdAndDelete(req.user.userId)
    .then(result => {
        if(!result) return res.status(500).json({
            msg: "Unable to delete user"
        });
        return res.json({msg: "User deleted"});
    })
}