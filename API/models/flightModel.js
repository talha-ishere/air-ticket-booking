const mongoose = require("mongoose");

const Seat = require("./seatModel");

const flightSchema = new mongoose.Schema(
  {
    flightNumber: String,
    airline: String,
    origin: String,
    destination: String,
    departureTime: Date,
    arrivalTime: Date,
    stops: Number,
    airplaneType: String,
    economySeats: Number,
    economySeatPrice: Number,
    businessSeats: Number,
    businessSeatPrice: Number,

    bookNowUrl: String,
  },
  { collection: "flightsData" }
);
flightSchema.index({
  flightNumber: "text",
  airline: "text",
  origin: "text",
  destination: "text",
});

// flightSchema.pre("save", async function (next) {
//   // Only create seats if the flight is being created (not updated)
//   if (this.isNew) {
//     const seatNumbers = Array.from({ length: this.totalSeats }, (_, index) => index + 1);

//     for (const seatNumber of seatNumbers) {
//       const seat = {
//         seatNumber,
//         isBooked: false,
//         flightId: this._id,
//       };

//       try {
//         await Seat.create(seat);
//       } catch (error) {
//         return next(error);
//       }
//     }

//     return next();
//   }

//   return next();
// });

//////////////////////////////////////////

flightSchema.pre("save", async function (next) {
  // Only create seats if the flight is being created (not updated)
  if (this.isNew) {
    const economySeatNumbers = Array.from({ length: this.economySeats }, (_, index) => index + 1);
    const businessSeatNumbers = Array.from({ length: this.businessSeats }, (_, index) => index + 1);
    for (const seatNumber of economySeatNumbers) {
      const seat = {
        seatNumber,
        isBooked: false,
        flightId: this._id,
        price: this.economySeatPrice,
        seatType: "economy",
      };

      try {
        await Seat.create(seat);
      } catch (error) {
        return next(error);
      }
    }
    for (const seatNumber of businessSeatNumbers) {
      const seat = {
        seatNumber,
        isBooked: false,
        flightId: this._id,
        price: this.businessSeatPrice,
        seatType: "business",
      };

      try {
        await Seat.create(seat);
      } catch (error) {
        return next(error);
      }
    }

    return next();
  }

  return next();
});

const Flight = mongoose.model("Flight", flightSchema);

module.exports = Flight;
