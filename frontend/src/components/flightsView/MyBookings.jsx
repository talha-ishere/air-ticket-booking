import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { FaUser } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";
import { MdFlight } from "react-icons/md";
import { useDispatch } from "react-redux";
import { fetchUserBookings } from "../../reducers/thunks/fetchUserBookings";
import { Table, Button } from "antd";
import "../.css";
import "./seat.css";

function MyBookings() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userIsLogin, setUserIsLogin] = useState(false);
  const [userBookings, setUserBookings] = useState([]);

  useEffect(() => {
    // Check if the 'jwt' cookie exists
    const jwtCookie = Cookies.get("jwt");

    if (jwtCookie) {
      // Cookie exists, handle accordingly
      setUserIsLogin(true);
    } else {
      // Cookie does not exist
      console.log("JWT cookie not found");
      navigate("/login");
    }
  }, []);
  useEffect(() => {
    dispatch(fetchUserBookings()).then((result) => {
      let status = result?.payload?.data?.status || "";
      if ((status = true)) {
        setUserBookings(result?.payload?.data?.data || []);
        console.log(result?.payload?.data?.data);
      }
    });
  }, []);
  const columns = [
    {
      title: "Passenger Name",
      dataIndex: "passengerName",
      key: "passengerName",
    },
    {
      title: "Airline",
      dataIndex: "airline",
      key: "airline",
    },
    {
      title: "Flight Number",
      dataIndex: "flightNumber",
      key: "flightNumber",
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
      title: "Seat Number",
      dataIndex: "seatNumber",
      key: "seatNumber",
    },
  ];
  const dataSource =
    userBookings?.length > 0 &&
    userBookings.map((booking) => ({
      key: booking._id,
      passengerName: booking?.passengerName,
      airline: booking?.flightId?.airline,
      origin: booking?.flightId?.origin,
      destination: booking?.flightId?.destination,
      departureTime: booking?.flightId?.departureTime,
      arrivalTime: booking?.flightId?.arrivalTime,
      flightNumber: booking?.flightId?.flightNumber,
      seatNumber: booking?.seatNumber,

      // _id: flight._id,
      // flightNumber: flight.flightNumber,
      // flight: flight,
    }));
  return (
    <>
      <div className="head-options">
        <div className="head-logo">
          <h1 style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
            Booking
          </h1>
        </div>
        <div className="head-buttons">
          <div className="button-wrap" onClick={() => navigate("/")}>
            <MdFlight size={15} />
            <p>Show Flights</p>
          </div>

          {userIsLogin ? (
            <div
              className="button-wrap"
              onClick={() => {
                Cookies.remove("jwt");
                navigate("/login");
              }}
            >
              <IoLogOut size={20} />
              <p>Logout</p>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
      <div style={{ margin: "40px" }}>
        <Table columns={columns} dataSource={dataSource} />
      </div>
    </>
  );
}
export default MyBookings;
