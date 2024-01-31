import { Button, Modal } from "antd";

function FlightDetailModal({ flightDetailModal, setFlightDetailModal, selectedFlight, setShowSeatsModal }) {
  console.log(selectedFlight);
  return (
    <>
      <Modal
        width={1400}
        title="Flight Details"
        open={flightDetailModal}
        onCancel={() => setFlightDetailModal(false)}
        className="flightDetailModal"
      >
        <h2>{selectedFlight?.airline}</h2>
        <div>
          <h4>From: {selectedFlight?.origin}</h4>
          <h4>To:{selectedFlight?.destination} </h4>
          <p>Deaparture Time: {selectedFlight?.departureTime}</p>
          <p>Arrival Time: {selectedFlight?.arrivalTime}</p>
          <p>Flight Number: {selectedFlight?.flightNumber}</p>
          <p>Stops: {selectedFlight?.flight?.stops || selectedFlight.stops}</p>
          <h4>Prices:</h4>
          <p>Economy Class: {selectedFlight?.flight?.economySeatPrice || selectedFlight.economySeatPrice}</p>
          <p>Business Class: {selectedFlight?.flight?.businessSeatPrice || selectedFlight.businessSeatPrice}</p>
        </div>
        <Button
          type="primary"
          size="large"
          block
          style={{ fontSize: "large", width: "20%" }}
          onClick={() => {
            setFlightDetailModal(false);
            setShowSeatsModal(true);
          }}
        >
          Check For Available Seats
        </Button>
      </Modal>
    </>
  );
}

export default FlightDetailModal;
