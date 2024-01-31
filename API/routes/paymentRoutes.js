const express = require("express");
const paymentControllers = require("../controllers/paymentControllers");

const router = express.Router();

router.post("/create-payment-intent", paymentControllers.createPaymentIntent);

module.exports = router;
