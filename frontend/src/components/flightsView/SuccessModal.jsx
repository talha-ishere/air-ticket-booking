import { Button, Modal } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TiTick } from "react-icons/ti";

function SuccessModal({ showSuccessModal, setShowSuccessModal, title }) {
  const navigate = useNavigate();
  return (
    <>
      <Modal
        title="Success"
        open={showSuccessModal}
        onOk={() => setShowSuccessModal(false)}
        onCancel={() => setShowSuccessModal(false)}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <TiTick size={80} style={{ color: "lightgreen" }} />
          <h2>{title}</h2>
        </div>
      </Modal>
    </>
  );
}

export default SuccessModal;
