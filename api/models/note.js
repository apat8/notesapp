const mongoose = require("mongoose");
const BlockSchema = require("./block.js");

const Schema = mongoose.Schema;

const noteSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    orderNum : {
        type: Number,
        min : [0, "Invalid Order Number"],
        required : [true, "Order Number is required"]
    },
    lastEdited : {
        type: Date, 
        default: Date.now,
    },
    blocks: [BlockSchema]
})

module.exports = mongoose.model("Note", noteSchema);