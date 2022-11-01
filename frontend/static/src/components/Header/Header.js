import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import Cookies from "js-cookie";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";

function Header({ isAuth, setIsAuth, state, setState }) {
  const navigate = useNavigate();
  const handleError = (err) => {
    console.warn(err);
  };
  const logout = async () => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
      body: JSON.stringify(state),
    };
    const response = await fetch("/dj-rest-auth/logout/", options).catch(
      handleError
    );
    if (!response.ok) {
      throw new Error("Oops! Something went wrong");
    } else {
      const data = await response.json();
      Cookies.remove("Authorization", `Token${" "}${data.key}`);
      document.cookie =
        "sessionid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      sessionStorage.clear();
      await setIsAuth(false);
      navigate("/");
    }
  };

  return (
    <header style={{ display: "flex", justifyContent: "flex-end" }}>
      {isAuth ? (
        <Button onClick={() => logout()}>
          <a>Logout</a>
        </Button>
      ) : null}
    </header>
  );
}
export default Header;
