import { useState } from "react";
import SignupForm from "./SignUpForm";
import { loginUser } from "../../reducers/thunks/loginThunk";
import { useDispatch, useSelector } from "react-redux";
import { Result } from "antd";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [apiMessage, setApiMessage] = useState();
  const [loginValues, setLoginValues] = useState({ email: "", password: "" });
  const [haveAcc, setHaveAcc] = useState(true);
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  async function handlerLogin() {
    validateForm();
    if (loginValues.email !== "" && loginValues.password !== "") {
      let payload = loginValues;
      const apiResult = await dispatch(loginUser(payload)).then((result) => {
        if (result?.payload?.status === false) {
          let message = result.payload.message.message;
          console.log(message);
          setApiMessage(message);
        }
        console.log(result);
        if (result?.payload?.data?.status === true) {
          setApiMessage("");

          navigate("/");
        }
      });
    }
  }
  const validateForm = () => {
    const newErrors = {};

    // Validate each field

    if (loginValues.email.trim() === "") {
      newErrors.email = "Email cannot be empty";
    }

    if (loginValues.password.trim() === "") {
      newErrors.password = "Password cannot be empty";
    }

    // Update the errors state
    setErrors(newErrors);
  };

  function renderLoginBox() {
    return (
      <div className="form-wrapper">
        <div className="form-fields">
          <label>Email or Phone</label>
          <input
            type="text"
            value={loginValues.email}
            onChange={(e) => setLoginValues({ ...loginValues, email: e.target.value })}
            style={{ border: errors.email ? "1px solid red" : " 1px solid #a2abb1 " }}
          ></input>
          {errors.email ? <p>{errors.email} </p> : <p>&nbsp;</p>}
        </div>
        <div className="form-fields">
          <label>Password</label>
          <input
            type="password"
            value={loginValues.password}
            onChange={(e) => setLoginValues({ ...loginValues, password: e.target.value })}
            style={{ border: errors.password ? "1px solid red" : "1px solid #a2abb1" }}
          ></input>
          {errors.password ? <p>{errors.password} </p> : <p>&nbsp;</p>}
        </div>
        {apiMessage ? <p style={{ color: "red" }}>{apiMessage} </p> : <p>&nbsp;</p>}
        <button className="login-button" onClick={() => handlerLogin()}>
          Login
        </button>
        <span onClick={() => setHaveAcc(false)}>Don't have account? Click to SignUp</span>
        <h3 style={{ marginBottom: "0px" }}>OR</h3>{" "}
        <span style={{ marginTop: "12px" }} onClick={() => navigate("/")}>
          Continue as Guest
        </span>
      </div>
    );
  }
  function showLoginForm() {
    setHaveAcc(true);
  }

  return (
    <div className="login-box">
      <div className="login-box-wrapper">
        {haveAcc ? renderLoginBox() : <SignupForm showLoginForm={showLoginForm} />}
      </div>
    </div>
  );
}

export default LoginForm;
