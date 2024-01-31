import { Table, Button } from "antd";
// import "antd/dist/antd.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchFlightSeats } from "../../reducers/thunks/fetchFlightSeats";
import Seatsmodal from "./Seatsmodal";
import LoginAlertModal from "./LoginAlertModal";
import SuccessModal from "./SuccessModal";

import "../.css";
import "./seat.css";
import FlightDetailModal from "./FlightDetailModal";

const TableView2 = ({ data, userIsLogin, flightDetailModal, setFlightDetailModal }) => {
  console.log(data);
  const dispatch = useDispatch();
  const [showSeatsModal, setShowSeatsModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [flightNumber, setFlightNumber] = useState("");
  const [flightId, setFlightId] = useState(0);
  const [selectedFlight, setSelectedFlight] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  // const [flightDetailModal, setFlightDetailModal] = useState(false);

  const [seats, setSeats] = useState([]);
  function handlerFetchFlightSeats(id) {
    // console.log(id);
    // setShowSeatsModal(true);
    setFlightDetailModal(true);

    let payload = {};
    payload.params = id;
    dispatch(fetchFlightSeats(payload)).then((result) => {
      setSeats(result?.payload?.data?.data || []);
    });
  }
  // Define columns for the table
  const columns = [
    {
      title: "Airline",
      dataIndex: "airline",
      key: "airline",
    },
    {
      title: "Origin",
      dataIndex: "origin",
      key: "origin",
    },
    {
      title: "Destination",
      dataIndex: "destination",
      key: "destination",
    },
    {
      title: "Departure Time",
      dataIndex: "departureTime",
      key: "departureTime",
    },
    {
      title: "Arrival Time",
      dataIndex: "arrivalTime",
      key: "arrivalTime",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Button
          type="primary"
          onClick={() => {
            // console.log(record.flight);
            if (userIsLogin) {
              handlerFetchFlightSeats(record._id);
              setFlightNumber(record.flightNumber);
              setFlightId(record._id);
              setSelectedFlight(record);
            } else {
              setShowLoginModal(true);
            }
          }}
        >
          Book Now
        </Button>
      ),
    },
  ];
  let options = { year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", hour12: true };

  // Map the data to match the structure expected by Ant Design Table
  const dataSource =
    // data.lenght > 0 &&
    data?.map((flight) => ({
      key: flight._id,
      airline: flight.airline,
      origin: flight.origin,
      destination: flight.destination,
      // departureTime: flight.departureTime,
      departureTime: new Date(flight.departureTime).toLocaleString("en-US", options),
      arrivalTime: new Date(flight.arrivalTime).toLocaleString("en-US", options),
      _id: flight._id,
      flightNumber: flight.flightNumber,
      flight: flight,
    }));
  const paginationOptions = false;
  return (
    /////// ShowModal
    <>
      {showSuccessModal && (
        <SuccessModal
          showSuccessModal={showSuccessModal}
          setShowSuccessModal={setShowSuccessModal}
          title={"Seat Booked Successfully Now Proceed to Payment"}
        />
      )}

      {showSeatsModal && (
        <Seatsmodal
          seats={seats}
          showSeatsModal={showSeatsModal}
          setShowSeatsModal={setShowSeatsModal}
          flightNumber={flightNumber}
          flightId={flightId}
          setShowSuccessModal={setShowSuccessModal}
        />
      )}

      {showLoginModal && <LoginAlertModal showLoginModal={showLoginModal} setShowLoginModal={setShowLoginModal} />}
      {flightDetailModal && (
        <FlightDetailModal
          flightDetailModal={flightDetailModal}
          setFlightDetailModal={setFlightDetailModal}
          selectedFlight={selectedFlight}
          setShowSeatsModal={setShowSeatsModal}
        />
      )}

      <Table columns={columns} dataSource={dataSource} pagination={paginationOptions} />
    </>
  );
};

export default TableView2;
