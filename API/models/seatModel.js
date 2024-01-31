const mongoose = require("mongoose");

const seatSchema = new mongoose.Schema({
  seatNumber: { type: Number, required: true },
  isBooked: { type: Boolean, default: false },
  flightId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Flight",
    required: true,
  },
  price: { type: Number, required: true },
  seatType: { type: String, required: true },
  // Add other details about the seat as needed
});

const Seat = mongoose.model("Seat", seatSchema);

module.exports = Seat;
