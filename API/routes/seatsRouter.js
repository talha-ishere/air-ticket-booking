const express = require("express");
const seatsController = require("../controllers/seatsController");

const router = express.Router();

router.get("/fetchFlightSeats/:flightId", seatsController.fetchflightSeats);
router.patch("/bookFlightSeat/:seatId", seatsController.bookFlightSeat);

module.exports = router;
