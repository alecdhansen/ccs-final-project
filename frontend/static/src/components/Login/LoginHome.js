import TwitterLogin from "./TwitterLogin";
import AppLogin from "./AppLogin";
import { Link } from "react-router-dom";

function LoginHome({ setIsAuth, setState }) {
  return (
    <>
      <AppLogin setIsAuth={setIsAuth} setState={setState} />
      <div>Don't have an account?</div>
      <Link to="register">Register</Link>
      <TwitterLogin />
    </>
  );
}

export default LoginHome;
