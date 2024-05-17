/* Routes for Auth */
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require("dotenv").config();

//Message model
const MessageItem = require("../models/Message");

//CREATE
//Add a message to the pizzeria
router.post("/", async (req, res) => {
    try {
        const { name, email, message } = req.body;

        //check input
        if (!name || !email || !message) {
            return res.status(400).json({ error: "Invalid input, send name, email, and message"});
        }
        // Correct - save message
        const messageItem = new MessageItem({ name, email, message });
        await messageItem.save();

        res.status(201).json({message: "Message received"});

    } catch (error) {
        res.status(500).json({ error: "Server error"});
    }
});

//READ
//Hämta meddelandena från databasen
router.get("/", authenticateToken, async (req, res) => {
    try {
        let result = await MessageItem.find({});

        return res.json(result);
    } catch (error) {
        return res.status(500).json(error);
    }
});

//DELETE
//Ta bort meddelandet från databasen
router.delete("/:id", authenticateToken, async (req, res) => {
    try {
        const id = req.params.id;
        const result = await MessageItem.findOneAndDelete({ _id: id });

        if (!result) {
            return res.status(404).json({ message: "Message not found" });
        }

        return res.json({ message: "Message deleted successfully" });
    } catch (error) {
        return res.status(500).json({ error: "Something went wrong", details: error });
    }
});

//Validate token
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; //token

    if (token == null) res.status(401).json({ message: "Not Authorized for this route - token missing" });

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, username) => {
        if (err) return res.status(403).json({ message: "Invalid JWT" });

        req.username = username;
        next();
    })
}

module.exports = router;