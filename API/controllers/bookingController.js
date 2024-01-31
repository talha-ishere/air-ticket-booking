const Booking = require("../models/bookingModel");
const mongoose = require("mongoose");
const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

exports.fetchUserBookings = async (req, res, next) => {
  const jwtToken = req?.headers?.authorization;
  console.log(jwtToken);
  const decoded = await promisify(jwt.verify)(jwtToken, process.env.JWT_SECRET);
  const user = await User.findOne({ _id: decoded.id });
  let userId = user._id;

  try {
    // if (req?.params?.userId) {
    // let userId = req?.params?.userId;
    const userBookings = await Booking.find({ userId: userId }).populate("flightId");

    res.status(200).json({
      status: true,
      data: userBookings,
    });
    // } else {
    //   throw new Error("No user Id Find");
    // }
  } catch (err) {
    res.status(400).json({
      status: false,
      message: err.message,
    });
  }
};
