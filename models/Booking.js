const mongoose = require("mongoose");

//booking schema
const bookingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    phonenumber: {
        type: String,
        required: true,
    },
    numberOfGuests: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    }
});

//Register Booking
bookingSchema.statics.register = async function (name, phonenumber, numberOfGuests, date) {
    try {
        const booking = new this({ name, phonenumber, numberOfGuests, date });
        await booking.save();
        return booking;
    } catch (error) {
        throw error;
    }
};

const Booking = mongoose.model("Booking", bookingSchema);
module.exports = Booking;