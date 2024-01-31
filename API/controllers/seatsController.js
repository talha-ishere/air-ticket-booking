const Seat = require("../models/seatModel");
const Booking = require("../models/bookingModel");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const User = require("../models/userModel");

exports.fetchflightSeats = async (req, res, next) => {
  try {
    // const doc = await User.create(req.body);
    console.log(req.params.flightId);
    const seats = await Seat.find({ flightId: req.params.flightId });
    res.status(200).json({
      status: true,
      data: seats,
    });
  } catch (err) {
    res.status(400).json({
      status: false,
      message: err.message,
    });
  }
};

exports.bookFlightSeat = async (req, res, next) => {
  try {
    // const doc = await User.create(req.body);

    const jwtToken = req.headers.authorization;
    const decoded = await promisify(jwt.verify)(jwtToken, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: decoded.id });

    console.log(user);
    const bookingData = {
      seatId: req.params.seatId,
      flightId: req.body.payload.flightId,
      seatNumber: req.body.payload.seatNumber,
      userId: user._id,
      passengerName: req.body.payload.name,
      passengerEmail: req.body.payload.email,
      passengerPhone: req.body.payload.phoneNumber,
    };
    console.log(bookingData);

    const seat = await Seat.updateOne({ _id: req.params.seatId }, { $set: { isBooked: true } });
    const booking = await Booking.create(bookingData);

    res.status(200).json({
      status: true,
      data: seat,
    });
  } catch (err) {
    res.status(400).json({
      status: false,
      message: err.message,
    });
  }
};
