const express = require("express");
const bookingController = require("../controllers/bookingController");

const router = express.Router();
router.get("/fetchUserBookings", bookingController.fetchUserBookings);

module.exports = router;
