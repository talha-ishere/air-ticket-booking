const express = require("express");
const flightController = require("../controllers/flightController");

const router = express.Router();

router.post("/uploadFlightsData", flightController.createFlightsData);
router.get("/getAllFlights", flightController.getAllFlights);
router.post("/getSingleFlight", flightController.getSingleFlight);

module.exports = router;
