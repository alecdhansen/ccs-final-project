import { Link } from "react-router-dom";
// import TwitterLogin from "./TwitterLogin";
import AppLogin from "./AppLogin";

const LoginHome = () => {
  return (
    <>
      <main className="mainloginscreen">
        <div className="loginbox col-md-4 offset-md-4 col-10 offset-1">
          <AppLogin />
          <div className="registerbar">
            <div style={{ marginRight: "3px" }}>Don't have an account?</div>
            <Link
              to="register"
              style={{ marginLeft: "3px", textDecoration: "none" }}
            >
              Sign up
            </Link>
          </div>
          {/* <TwitterLogin /> */}
        </div>
        <div className="lowercontainer">
          <div className="quickaccess">
            <h3>For quick access</h3>
            <h5>Username - Alec</h5>
            <h5>password - safepass1</h5>
          </div>
        </div>
      </main>
    </>
  );
};

export default LoginHome;
