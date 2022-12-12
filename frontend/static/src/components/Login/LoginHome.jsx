import { Link } from "react-router-dom";
import TwitterLogin from "./TwitterLogin";
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
      </main>
    </>
  );
};

export default LoginHome;
