import TwitterLogin from "./TwitterLogin";
import AppLogin from "./AppLogin";
import { Link } from "react-router-dom";

function LoginHome({ setIsAuth, setState }) {
  return (
    <>
      <div className="loginbox col-md-4 offset-md-4 col-10 offset-1">
        <AppLogin setIsAuth={setIsAuth} setState={setState} />
        <div>Don't have an account?</div>
        <Link to="register">Register</Link>
        <TwitterLogin />
      </div>
    </>
  );
}

export default LoginHome;
