const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    seatId: { type: mongoose.Schema.Types.ObjectId, ref: "Seat", required: true },
    flightId: { type: mongoose.Schema.Types.ObjectId, ref: "Flight", required: true },
    seatNumber: { type: Number, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    passengerName: { type: String, required: true },
    passengerPhone: { type: Number, required: true },
    passengerEmail: { type: String, required: true },
    // Add other details about the seat as needed
  },
  { collection: "bookingData" }
);

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
