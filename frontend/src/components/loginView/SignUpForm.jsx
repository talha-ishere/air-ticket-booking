import { useState } from "react";
import { useDispatch } from "react-redux";
import { signUp } from "../../reducers/thunks/signUpThunk";
import SuccessModal from "../flightsView/SuccessModal";
function SignupForm({ showLoginForm }) {
  const [errDuplicate, setErrDuplicate] = useState(false);
  const dispatch = useDispatch();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [emailValid, setEmailValid] = useState(false);
  const [passwordLenghtErr, setPasswordLengthErr] = useState(false);

  const [signupValues, setSignupValues] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
  });
  function handlerLogin() {
    validateForm();
    if (signupValues.password.length < 8) {
      setPasswordLengthErr(true);
    }
    // else if (!signupValues.email.match("@")) {
    //   console.log("Please write valid email");
    //   setEmailValid(true);
    // }
    else {
      console.log(signupValues);
      let payload = signupValues;
      dispatch(signUp(payload)).then((result) => {
        if (result?.payload?.data?.status === true) {
          console.log("Done");

          setShowSuccessModal(true);
          setTimeout(() => {
            showLoginForm();
          }, 2000);

          setSignupValues({ email: "", username: "", password: "" });
        }
        if (result.payload.status === false && result.payload.message.message.match("E1100")) {
          console.log("Email already exited");
          setErrDuplicate(true);
        }
      });
    }
  }
  const validateForm = () => {
    const newErrors = {};

    // Validate each field
    if (signupValues.username.trim() === "") {
      newErrors.username = "Username cannot be empty";
    }

    if (signupValues.email.trim() === "") {
      newErrors.email = "Email cannot be empty";
    }

    if (signupValues.password.trim() === "") {
      newErrors.password = "Password cannot be empty";
    }
    // if (signupValues.password.length < 8) {
    //   setPasswordLengthErr(true);
    // }
    // if (!signupValues.email.match("@")) {
    //   setEmailValid(true);
    // }
    // Update the errors state
    setErrors(newErrors);
  };
  return (
    <>
      {showSuccessModal && (
        <SuccessModal
          showSuccessModal={showSuccessModal}
          setShowSuccessModal={setShowSuccessModal}
          title={"Account Created SuccessFully"}
        />
      )}
      <div className="form-wrapper">
        <div className="form-fields">
          <label>Username</label>
          <input
            type="text"
            value={signupValues.username}
            onChange={(e) => setSignupValues({ ...signupValues, username: e.target.value })}
            style={{
              border: errors.username ? "1px solid red" : " 1px solid #a2abb1 ",
            }}
          ></input>
          {errors.username ? <p>{errors.username} </p> : <p>&nbsp;</p>}
        </div>
        <div className="form-fields">
          <label>Email or Phone</label>
          <input
            type="text"
            value={signupValues.email}
            onChange={(e) => setSignupValues({ ...signupValues, email: e.target.value })}
            style={{
              border: errors.email ? "1px solid red" : "1px solid #a2abb1",
            }}
          ></input>
          {errors.email ? <p>{errors.email} </p> : <p>&nbsp;</p>}
        </div>
        <div className="form-fields">
          <label>Password</label>
          <input
            type="password"
            value={signupValues.password}
            onChange={(e) => setSignupValues({ ...signupValues, password: e.target.value })}
            style={{
              border: errors.password ? "1px solid red" : "1px solid #a2abb1",
            }}
          ></input>
          {errors.password ? <p>{errors.password} </p> : <p>&nbsp;</p>}
          {errDuplicate ? <p>Email already existed </p> : <p>&nbsp;</p>}
          {emailValid ? <p>Please write a valid Email </p> : <p>&nbsp;</p>}
          {passwordLenghtErr ? <p>Password should be at'least 8 chracter </p> : <p>&nbsp;</p>}
        </div>
        <button className="login-button" onClick={() => handlerLogin()}>
          SignUp
        </button>
        <span onClick={() => showLoginForm()}>Have an account ? Click to SignIn</span>
      </div>
    </>
  );
}

export default SignupForm;
