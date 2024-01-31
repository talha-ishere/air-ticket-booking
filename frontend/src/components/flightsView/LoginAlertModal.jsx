import { IoInformationCircleSharp } from "react-icons/io5";
import { Button, Modal } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
function LoginAlertModal({ showLoginModal, setShowLoginModal }) {
  const navigate = useNavigate();
  return (
    <>
      <Modal
        title="You should Login First"
        open={showLoginModal}
        onOk={() => navigate("/login")}
        onCancel={() => setShowLoginModal(false)}
      >
        <IoInformationCircleSharp size={30} style={{ color: "tomato" }} />
        <h2 style={{ color: "tomato" }}>Click Ok to Login</h2>
      </Modal>
    </>
  );
}

export default LoginAlertModal;
