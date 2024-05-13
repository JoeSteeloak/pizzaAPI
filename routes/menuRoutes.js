/* Routes for Auth */
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require("dotenv").config();

//Menu item model
const MenuItem = require("../models/MenuItem");

//Add a new menu item
router.post("/register", authenticateToken, async (req, res) => {
    try {
        const { foodname, price, ingredients } = req.body;

        // check input
        if (!foodname || !price || !ingredients) {
            return res.status(400).json({ error: "Invalid input, send foodname, price, and ingredients" });
        }

        //check uniqueness of foodname
        const existFoodname = await MenuItem.findOne({ foodname: req.body.foodname });
        if (existFoodname) {
            return res.status(500).json({ error: "Foodname unavailable"});
        };

        // Correct - save menu item
        const menuItem = new MenuItem({ foodname, price, ingredients });
        await menuItem.save();

        res.status(201).json({ message: "MenuItem created" });

    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
})

//Validate token
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; //token

    if(token == null) res.status(401).json({message: "Not Authorized for this route - token missing"});

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, username) => {
        if(err) return res.status(403).json({message: "Invalid JWT"});

        req.username = username;
        next();
    })
}

module.exports = router;