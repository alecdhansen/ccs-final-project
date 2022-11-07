import { Link } from "react-router-dom";
import TwitterLogin from "./TwitterLogin";
import AppLogin from "./AppLogin";

function LoginHome() {
  return (
    <>
      <main className="mainloginscreen">
        <div className="loginbox col-md-4 offset-md-4 col-10 offset-1">
          <AppLogin />
          <div>Don't have an account?</div>
          <Link to="register">Register</Link>
          <TwitterLogin />
        </div>
      </main>
    </>
  );
}

export default LoginHome;
