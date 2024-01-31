import "./.css";
import LoginForm from "./LoginForm";

function LoginPage() {
  return (
    <>
      <div className="headBar">
        <div>
          <div style={{ color: "white", marginLeft: "30px", fontStyle: "italic" }}>
            <h1 style={{ padding: "10px" }}>Booking</h1>
          </div>
        </div>
      </div>

      <div className="footBar"></div>
      <LoginForm />
    </>
  );
}
export default LoginPage;
