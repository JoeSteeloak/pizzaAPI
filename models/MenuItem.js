const mongoose = require("mongoose");

//Menu Item Schema
const menuItemSchema = new mongoose.Schema({
    foodname: {
        type: String,
        required: true,
        unique: true,
    },
    price: {
        type: Number,
        required: true
    },
    ingredients: {
        type: String,
        required: true,
    },
    created: {
        type: Date,
        default: Date.now
    }
});

// Register Menu Item
menuItemSchema.statics.register = async function (foodname, price, ingredients) {
    try {
        const foodItem = new this({ foodname, price, ingredients });
        await foodItem.save();
        return foodItem;
    } catch (error) {
        throw error;
    }
};

const MenuItem = mongoose.model("MenuItem", menuItemSchema);
module.exports = MenuItem;