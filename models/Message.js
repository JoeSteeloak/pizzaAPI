const mongoose = require("mongoose");

//Message schema
const messageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    }
});

//Register Message
messageSchema.statics.register = async function (name, email, message) {
    try {
        const messageItem = new this({ name, email, message });
        await messageItem.save();
        return messageItem;
    } catch (error) {
        throw error;
    }
};

const MessageItem = mongoose.model("MessageItem", messageSchema);
module.exports = MessageItem;