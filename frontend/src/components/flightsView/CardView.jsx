import { Card, Col, Row, Button } from "antd";
import FlightDetailModal from "./FlightDetailModal";
import "../.css";
import Seatsmodal from "./Seatsmodal";
import LoginAlertModal from "./LoginAlertModal";
import SuccessModal from "./SuccessModal";
import { useState } from "react";
// const { Meta } = Card;
import { useDispatch } from "react-redux";
import { fetchFlightSeats } from "../../reducers/thunks/fetchFlightSeats";

function CardView({ data, setFlightDetailModal, flightDetailModal, userIsLogin }) {
  const dispatch = useDispatch();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [flightNumber, setFlightNumber] = useState("");
  const [flightId, setFlightId] = useState(0);
  const [selectedFlight, setSelectedFlight] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showSeatsModal, setShowSeatsModal] = useState(false);
  const [seats, setSeats] = useState([]);
  let options = { year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", hour12: true };

  console.log(selectedFlight);
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
  return (
    <div style={{ backgroundColor: "transparent" }}>
      {showLoginModal && <LoginAlertModal showLoginModal={showLoginModal} setShowLoginModal={setShowLoginModal} />}

      {showSuccessModal && (
        <SuccessModal
          showSuccessModal={showSuccessModal}
          setShowSuccessModal={setShowSuccessModal}
          title={"Seat Booked Successfully"}
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

      {flightDetailModal && (
        <FlightDetailModal
          flightDetailModal={flightDetailModal}
          setFlightDetailModal={setFlightDetailModal}
          selectedFlight={selectedFlight}
          setShowSeatsModal={setShowSeatsModal}
        />
      )}
      <Row gutter={20} className=".card-row-spacing" style={{ marginTop: "15px" }}>
        {data?.length > 0 ? (
          data.map((flight) => (
            <Col span={8} key={flight?._id}>
              <Card title={flight?.airline} bordered={false} style={{ marginBottom: "15px" }}>
                <div>
                  <div>
                    <strong>Flight Name:</strong> {flight?.airplaneType}
                  </div>
                  <div>
                    <strong>Departure:</strong> {flight?.origin}
                  </div>
                  <div>
                    <strong>Destination:</strong> {flight?.destination}
                  </div>
                  <div>
                    <strong>Stops:</strong> {flight?.stops}
                  </div>
                  <div>
                    <strong>Departure Time:</strong> {new Date(flight?.departureTime).toLocaleString("en-US", options)}
                  </div>
                  <Button
                    type="primary"
                    size="medium"
                    block
                    style={{ width: "6rem", marginTop: "10px" }}
                    onClick={() => {
                      // setFlightDetailModal(true);
                      // setShowSeatsModal(true);
                      // setSelectedFlight(flight);

                      if (userIsLogin) {
                        handlerFetchFlightSeats(flight?._id);
                        setFlightNumber(flight?.flightNumber);
                        setFlightId(flight?._id);
                        setSelectedFlight(flight);
                      } else {
                        setShowLoginModal(true);
                      }
                    }}
                  >
                    BookNow
                  </Button>
                </div>
              </Card>
            </Col>
          ))
        ) : (
          <h2 style={{ color: "white" }}>No data to show</h2>
        )}
      </Row>
    </div>
  );
}
export default CardView;
