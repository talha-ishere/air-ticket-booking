const Flight = require("../models/flightModel");

exports.createFlightsData = async (req, res, next) => {
  const flightsData = req.body;
  try {
    const createdFlights = await Promise.all(
      flightsData.map(async (flightData) => {
        const newFlight = new Flight(flightData);
        return await newFlight.save();
      })
    );

    res.status(201).json({
      status: true,
      message: "Flights created successfully",
      data: createdFlights,
    });
  } catch (err) {
    res.status(400).json({
      status: false,
      message: "Error creating flights",
    });
  }
};

exports.getAllFlights = async (req, res) => {
  try {
    let query = {};

    // Check if search term is provided
    if (req.query.term) {
      const searchTerm = req.query.term;
      query = {
        $or: [
          { flightNumber: { $regex: searchTerm, $options: "i" } },
          { airline: { $regex: searchTerm, $options: "i" } },
          { origin: { $regex: searchTerm, $options: "i" } },
          { destination: { $regex: searchTerm, $options: "i" } },
        ],
      };
    }

    // Check if pagination parameters are provided
    const { page, limit } = req.query;
    const pageNumber = parseInt(page) || 1;
    const pageSize = parseInt(limit) || 10;
    const skip = (pageNumber - 1) * pageSize;

    // Fetch data based on the query and pagination parameters
    const flights = await Flight.find(query).skip(skip).limit(pageSize);

    res.status(200).json({
      status: true,
      message: "Flight data retrieved successfully",
      data: flights,
    });
  } catch (error) {
    console.error("Error while fetching flights:", error);
    res.status(500).json({
      status: false,
      message: "Internal Server Error",
    });
  }
};

exports.getSingleFlight = async (req, res, next) => {
  try {
    // query = {
    //   $or: [{ airline: req.body.airline }, { origin: req.body.origin }, { destination: req.body.destination }],
    // };
    const flight = await Flight.findOne(req.body);
    res.status(200).json({
      status: true,
      data: flight,
    });
  } catch (err) {
    res.status(400).json({
      status: "success",
      message: err.message,
    });
  }
};
