/* Routes for Booking */
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require("dotenv").config();

//Message model
const Booking = require("../models/Booking");

//CREATE
//Add a booking to the pizzeria
router.post("/", async (req, res) => {
    try {
        const { name, phonenumber, numberOfGuests, date } = req.body;

        //check input
        if (!name || !phonenumber || !numberOfGuests || !date) {
            return res.status(400).json({ error: "Fyll i alla fälten, tack"});
        }
        // Correct - save message
        const booking = new Booking({ name, phonenumber, numberOfGuests, date });
        await booking.save();

        res.status(201).json({message: "Bokning reserverad!"});

    } catch (error) {
        res.status(500).json({ error: "Server error"});
    }
});

//READ
//Hämta bokningar från databasen
router.get("/", authenticateToken, async (req, res) => {
    try {
        let result = await Booking.find({});

        return res.json(result);
    } catch (error) {
        return res.status(500).json(error);
    }
});

//DELETE
//Ta bort bokningar från databasen
router.delete("/:id", authenticateToken, async (req, res) => {
    try {
        const id = req.params.id;
        const result = await Booking.findOneAndDelete({ _id: id });

        if (!result) {
            return res.status(404).json({ message: "Booking not found" });
        }

        return res.json({ message: "Booking deleted successfully" });
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