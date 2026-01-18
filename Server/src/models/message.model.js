const mongoose = require("mongoose");
const messageSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 100
    }

}, { timestamps: true })
const Message = mongoose.model("Msg_Loop_Message", messageSchema);
module.exports = Message;