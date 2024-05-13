/* Routes for Auth */
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require("dotenv").config();

//Menu item model
const MenuItem = require("../models/MenuItem");

//Add a new menu item
router.post("/register", async (req, res) => {
    try {
        const { foodname, price, ingredients } = req.body;

        // check input
        if (!foodname || !price || !ingredients) {
            return res.status(400).json({ error: "Invalid input, send foodname, price, and ingredients" });
        }

        //check uniqueness of username
        const existFoodname = await MenuItem.findOne({ foodname: req.body.foodname });
        if (existFoodname) {
            return res.status(500).json({ error: "Foodname unavailable"});
        };

        // Correct - save user
        const menuItem = new MenuItem({ foodname, price, ingredients });
        await menuItem.save();

        res.status(201).json({ message: "MenuItem created" });

    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
})

module.exports = router;