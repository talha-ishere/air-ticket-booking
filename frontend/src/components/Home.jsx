import { useState } from "react";
import "./.css";
import { IoMdSearch } from "react-icons/io";
import { MdOutlineViewHeadline } from "react-icons/md";
import { MdGridView } from "react-icons/md";
import CardView from "./flightsView/CardView";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { FaUser } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchFlightsThunk } from "../reducers/thunks/fetchFlightsThunk";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import TableView2 from "./flightsView/TableView2";

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [cardView, setCardView] = useState(false);
  const [userIsLogin, setUserIsLogin] = useState(false);
  const [flightsData, setFlightsData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [flightDetailModal, setFlightDetailModal] = useState(false);

  useEffect(() => {
    // Check if the 'jwt' cookie exists
    const jwtCookie = Cookies.get("jwt");
    const userName = Cookies.get("userName");

    if (jwtCookie) {
      // Cookie exists, handle accordingly
      setUserIsLogin(true);
    } else {
      // Cookie does not exist
      console.log("JWT cookie not found");
    }
  }, []);
  useEffect(() => {
    dispatch(fetchFlightsThunk()).then((result) => {
      let status = result?.payload?.data?.status || "";
      if ((status = true)) {
        setFlightsData(result?.payload?.data?.data || []);
      }
    });
  }, []);
  //////////////////// Debounce
  const [debounceTimeout, setDebounceTimeout] = useState(null);

  // Function to handle search change
  const handlerSearchChange = (value) => {
    setSearchValue(value);

    // Clear the existing timeout
    clearTimeout(debounceTimeout);

    // if (value !== "") {
    // Set a new timeout for the API call
    const newTimeout = setTimeout(() => {
      console.log("Call API", value);
      let payload = {};
      payload.term = value;
      dispatch(fetchFlightsThunk(payload)).then((result) => {
        setFlightsData(result?.payload?.data?.data || []);
      });
      // Add your API call logic here
    }, 300);

    // Save the new timeout ID to the state
    setDebounceTimeout(newTimeout);
    // }
  };

  useEffect(() => {
    // Cleanup the timeout on component unmount
    return () => {
      clearTimeout(debounceTimeout);
    };
  }, [debounceTimeout]);
  function handlerNext() {
    let payload = {};
    payload.term = searchValue;
    console.log("next");
    if (flightsData.length > 0) {
      payload.page = pageNumber + 1;
      console.log(flightsData);

      dispatch(fetchFlightsThunk(payload)).then((result) => {
        if ((result.payload.data.status = true)) {
          setFlightsData(result?.payload?.data?.data || []);
          setPageNumber(payload.page);
        }
      });
    }
  }
  function handlerPrev() {
    let payload = {};
    payload.term = searchValue;

    console.log("Prec");
    if (pageNumber > 1) {
      payload.page = pageNumber - 1;
      dispatch(fetchFlightsThunk(payload)).then((result) => {
        if ((result.payload.data.status = true)) {
          setFlightsData(result?.payload?.data?.data || []);
          setPageNumber(payload.page);
        }
      });
    }
  }
  return (
    <div>
      <div className="head-options">
        <div className="head-logo">
          <h1 style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
            Booking
          </h1>
        </div>
        <div className="head-buttons">
          {userIsLogin ? (
            <div className="button-wrap" onClick={() => navigate("/myBookings")}>
              <FaUser size={15} />
              <p>{Cookies.get("userName")} Bookings</p>
            </div>
          ) : (
            <div className="button-wrap" onClick={() => navigate("/login")}>
              <FaUser size={15} />
              <p>Login</p>
            </div>
          )}

          {userIsLogin ? (
            <div
              className="button-wrap"
              onClick={() => {
                Cookies?.remove("jwt");
                Cookies?.remove("userName");
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

      <div>
        <div className="home-options">
          <div className="head-serachbar">
            <IoMdSearch size={30} style={{ marginLeft: "12px" }} />
            <input
              type="text"
              value={searchValue}
              placeholder="Search for flight, place or airline"
              onChange={(e) => handlerSearchChange(e.target.value)}
            ></input>
          </div>
          <button onClick={() => setCardView(false)} style={{ display: !cardView ? "none" : "block" }}>
            <MdOutlineViewHeadline size={30} />
          </button>
          <button onClick={() => setCardView(true)} style={{ display: cardView ? "none" : "block" }}>
            <MdGridView size={30} />
          </button>
        </div>
      </div>
      <div className="view-wrapper" style={{ backgroundColor: "transparent" }}>
        <div className="pagging" style={{ color: "white", marginBottom: "10px" }}>
          <div className="page-number">Page Number : {pageNumber}</div>
          <div
            className="arrow-buttons"
            onClick={() => {
              handlerPrev();
            }}
          >
            <FaArrowLeft size={15} style={{ color: "black" }} />
          </div>
          <div
            className="arrow-buttons"
            onClick={() => {
              handlerNext();
            }}
          >
            <FaArrowRight size={15} style={{ color: "black" }} />
          </div>
        </div>
        {cardView ? (
          <CardView
            data={flightsData}
            flightDetailModal={flightDetailModal}
            setFlightDetailModal={setFlightDetailModal}
            userIsLogin={userIsLogin}
          />
        ) : (
          <TableView2
            data={flightsData}
            flightDetailModal={flightDetailModal}
            setFlightDetailModal={setFlightDetailModal}
            userIsLogin={userIsLogin}
          />
        )}
      </div>
    </div>
  );
}
export default Home;
