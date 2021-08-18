const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        trirm: true
    },
    lastname: {
        type: String,
        required: true,
        trirm: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trirm: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    }
}, {collections: "users"})

module.exports = mongoose.model("User", UserSchema);