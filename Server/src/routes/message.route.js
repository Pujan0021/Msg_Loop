const express = require("express");
const router = express.Router();
const Message = require("../models/message.model");


router.post("/send/:id", async (req, res) => {
    const { message } = req.body;
    const { id } = req.params;
    if (!message) {
        return res.status(400).send({
            success: false,
            message: "Message not sent"
        })
    }
    try {
        const sentMessage = new Message({
            message
        });
        await sentMessage.save();
        res.status(200).send({
            success: true,
            message: "Message Sent",
            userId: id
        })

    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Failed to send message",
        })
    }
});
module.exports = router;