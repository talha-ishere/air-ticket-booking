const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");

const userRoutes = require("./routes/userRoutes");
const flightRoutes = require("./routes/flightRoutes");
const seatsRouter = require("./routes/seatsRouter");
const bookingRoutes = require("./routes/bookingRoutes");
const paymentRoutes = require("./routes/paymentRoutes");

// app.use(cors({ credentials: true }));

app.use(
  cors({
    origin: ["http://localhost:3000", "http://127.0.0.1:3000"], // Allow requests from this origin
    credentials: true, // Allow credentials (cookies)
  })
);
app.use(cookieParser());
// app.use(errorHandler);

app.use(express.json({ limit: "10kb" }));

app.use("/user", userRoutes);
app.use("/flight", flightRoutes);
app.use("/seats", seatsRouter);
app.use("/bookings", bookingRoutes);
app.use("/payment", paymentRoutes);

module.exports = app;
