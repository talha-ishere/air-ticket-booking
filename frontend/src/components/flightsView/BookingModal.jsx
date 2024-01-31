import { Button, Modal, Input } from "antd";
import { useState } from "react";
import { CiUser } from "react-icons/ci";
import { CiPhone } from "react-icons/ci";
import { HiOutlineMail } from "react-icons/hi";
import { MdAirlineSeatReclineExtra } from "react-icons/md";
import { MdFlight } from "react-icons/md";
import { useDispatch } from "react-redux";
import { bookFlightSeat } from "../../reducers/thunks/bookFlightSeat";
import { useNavigate } from "react-router-dom";
import { MdPriceChange } from "react-icons/md";

import { createPaymentIntent } from "../../reducers/thunks/createPaymentIntent";

function BookingModal({
  showBookingModal,
  setShowBookingModal,
  seatNumber,
  flightNumber,
  flightId,
  seatId,
  setShowSeatsModal,
  selectedSeat,
  setShowSuccessModal,
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(0);
  const [fieldsErr, setFieldsErr] = useState(false);

  function handleBooking() {
    console.log(selectedSeat);
    if ((name != "" && email != "", phoneNumber != "")) {
      let payload = {
        name: name,
        email: email,
        phoneNumber: phoneNumber,
        flightId: flightId,
        seatNumber: seatNumber,
        seatId: seatId,
        price: selectedSeat?.price || 0,
      };
      dispatch(bookFlightSeat(payload)).then((result) => {
        setShowBookingModal(false);
        setShowSeatsModal(false);
        setShowSuccessModal(true);
        ////////////////////
        setTimeout(() => {
          dispatch(createPaymentIntent(payload)).then((result) => {
            if ((result.payload.status = 200)) {
              let url = result.payload.data.url;
              window.location.href = url;

              // navigate(url);
            }
          });
        }, 700);
        ///////////////////
      });

      setName("");
      setPhoneNumber(0);
      setEmail("");
    } else {
      console.log("Please Fill all the fields");
      setFieldsErr(true);
    }
  }
  return (
    <>
      <Modal
        title="Enter Details to Book a Seat"
        open={showBookingModal}
        // onOk={handleOk}
        onCancel={() => setShowBookingModal(false)}
        className="bookingModal"
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <Input
            size="large"
            placeholder="Enter Your Name"
            onChange={(e) => setName(e.target.value)}
            value={name}
            prefix={<CiUser />}
          />
          <Input
            size="large"
            type="number"
            placeholder="Enter Your Phonenumber"
            onChange={(e) => setPhoneNumber(e.target.value)}
            value={phoneNumber}
            prefix={<CiPhone />}
          />
          <Input
            size="large"
            type="email"
            placeholder="Enter Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            prefix={<HiOutlineMail />}
          />
          <Input size="large" placeholder="Flight" value={flightNumber} prefix={<MdFlight />} disabled />
          <Input
            size="large"
            placeholder="Seat Number"
            value={seatNumber}
            prefix={<MdAirlineSeatReclineExtra />}
            disabled
          />
          <Input size="large" placeholder="Price" value={selectedSeat.price} prefix={<MdPriceChange />} disabled />
          {fieldsErr ? <p style={{ color: "tomato" }}>Please Fill all the Fields First </p> : <p>&nbsp;</p>}

          <Button type="primary" size="large" block style={{ fontSize: "large" }} onClick={() => handleBooking()}>
            Book
          </Button>
        </div>
      </Modal>
    </>
  );
}

export default BookingModal;
