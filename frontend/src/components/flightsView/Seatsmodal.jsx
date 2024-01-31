import { Modal } from "antd";
import { useState } from "react";
import BookingModal from "./BookingModal";
import "./seat.css";
import "../.css";

function Seatsmodal({ seats, showSeatsModal, setShowSeatsModal, flightNumber, flightId, setShowSuccessModal }) {
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [seatNumber, setSeatNumber] = useState(0);
  const [seatId, setSeatId] = useState("");
  const [selecetedSeat, setSelectedSeat] = useState(0);
  // console.log(selecetedSeat);
  return (
    <>
      {showBookingModal && (
        <BookingModal
          showBookingModal={showBookingModal}
          setShowBookingModal={setShowBookingModal}
          seatNumber={seatNumber}
          flightNumber={flightNumber}
          flightId={flightId}
          seatId={seatId}
          setShowSeatsModal={setShowSeatsModal}
          selectedSeat={selecetedSeat}
          setShowSuccessModal={setShowSuccessModal}
        />
      )}
      <Modal
        title="All Seats"
        open={showSeatsModal}
        // onOk={handleOk}
        onCancel={() => setShowSeatsModal(false)}
        className="seat-modal"
        width={1400}
        // style={{ maxWidth: "1400px" }}
      >
        <div style={{ maxHeight: "900px", overflowY: "auto", height: "50vh" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            Available{" "}
            <div
              style={{
                padding: "8px 9px",
                backgroundColor: "#E7E7E8",
                marginBottom: "4px",
              }}
            ></div>
            Booked
            <div
              style={{
                padding: "8px 9px",
                backgroundColor: "tomato",
                marginBottom: "4px",
              }}
            ></div>
          </div>
          <p>Select any available Seat to proceed furthure</p>
          <h2 style={{ display: "block" }}>Business Class Seats</h2>
          <div className="seats-wrapper">
            {seats ? (
              seats?.map((seat) => {
                if (seat.seatType === "business") {
                  return (
                    <button
                      key={seat?._id}
                      className="single-seat"
                      style={{
                        backgroundColor: seat.isBooked ? "tomato" : "#E7E7E8",
                        color: seat.isBooked ? "#ffff" : "inherit",
                        cursor: seat.isBooked ? "not-allowed" : "pointer",
                        // disabled: seat.isBooked ? true : false,
                      }}
                      onClick={() => {
                        if (!seat.isBooked) {
                          setSeatNumber(seat.seatNumber);
                          setSeatId(seat._id);
                          setShowBookingModal(true);
                          setSelectedSeat(seat);
                        }
                        // !seat.isBooked &&
                        // !seat.isBooked &&
                        // !seat.isBooked &&
                        // !seat.isBooked &&
                        //   !seat.isBooked &&

                        // dispatch(createPaymentIntent(payload)).then((result) => {
                        //   if ((result.payload.status = 200)) {
                        //     let url = result.payload.data.url;
                        //     window.location.href = url;
                        //   }
                        // });
                      }}
                    >
                      <h3>{seat.seatNumber}</h3>
                    </button>
                  );
                }
              })
            ) : (
              <h1> Please Wait Fetching Seath....... Or Retry</h1>
            )}
          </div>
          {/* //////////// */}
          <h2 style={{ display: "block" }}>Economy Class Seats</h2>
          <div className="seats-wrapper">
            {seats ? (
              seats?.map((seat) => {
                if (seat.seatType === "economy") {
                  return (
                    <button
                      key={seat._id}
                      className="single-seat"
                      style={{
                        backgroundColor: seat.isBooked ? "tomato" : "#E7E7E8",
                        color: seat.isBooked ? "#ffff" : "inherit",
                        cursor: seat.isBooked ? "not-allowed" : "pointer",
                        // disabled: seat.isBooked ? true : false,
                      }}
                      onClick={() => {
                        if (!seat.isBooked) {
                          setSeatNumber(seat.seatNumber);
                          setSeatId(seat._id);
                          setShowBookingModal(true);
                          setSelectedSeat(seat);
                        }
                      }}
                    >
                      <h3>{seat.seatNumber}</h3>
                    </button>
                  );
                }
              })
            ) : (
              <h1> Please Wait Fetching Seath....... Or Retry</h1>
            )}
          </div>
        </div>
      </Modal>
    </>
  );
}
export default Seatsmodal;
