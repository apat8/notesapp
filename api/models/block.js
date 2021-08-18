const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const block = new Schema({
    orderNum : {
        type: Number,
        min : [0, "Invalid Order Number"],
        required : [true, "Order Number is required"]
    },
    content : {
        type: String,
    },
    style : {
        type: String,
        enum : ["regular", "bold", "italic", "boldItalic"],
        default: "regular"
    }

})

module.exports = block;