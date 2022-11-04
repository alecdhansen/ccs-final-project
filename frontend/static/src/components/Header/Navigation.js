import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Cookies from "js-cookie";
import { useNavigate, Link } from "react-router-dom";
import "./HeaderNav.css";
import Swal from "sweetalert2";
import { useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";

function Navigation({ isAuth, setIsAuth, state }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
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
      localStorage.clear();
      await setIsAuth(false);
      const Toast = Swal.mixin({
        toast: true,
        position: "bottom-end",
        showConfirmButton: false,
        timer: 2000,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });

      Toast.fire({
        icon: "warning",
        title: "You are now logged out.",
      });
      navigate("/");
    }
  };

  return (
    <>
      <Button
        variant="primary"
        className="d-md-none sticky"
        onClick={handleShow}
      >
        Launch
      </Button>
      <header className="col-12 navheader">
        <Offcanvas
          placement="end"
          show={show}
          onHide={handleClose}
          responsive="md"
        >
          <Offcanvas.Header closeButton className="offcanvasheader">
            {" "}
          </Offcanvas.Header>
          <Offcanvas.Body className="offcanvasbody">
            {isAuth ? (
              <Nav.Item className="navlink">
                <Link to={"/profile/"} className="link">
                  <Button className="navbtn">Profile</Button>
                </Link>
              </Nav.Item>
            ) : (
              ""
            )}
            {isAuth ? (
              <Nav.Item className="navlink">
                <Link to={"leaderboard"}>
                  <Button className="navbtn">Leaderboard</Button>
                </Link>
              </Nav.Item>
            ) : null}
            {isAuth ? (
              <Nav.Item autofocus className="navlink">
                <Link to={"card"}>
                  <Button type="button" autoFocus className="navbtn">
                    Home
                  </Button>
                </Link>
              </Nav.Item>
            ) : null}
            {isAuth ? (
              <Nav.Item className="navlink">
                <Link to={"h2h"}>
                  <Button className="navbtn">Head to Head</Button>
                </Link>
              </Nav.Item>
            ) : null}
            {isAuth ? (
              <Nav.Item className="navlink">
                <Button className="navbtn" onClick={() => logout()}>
                  <a>Logout</a>
                </Button>
              </Nav.Item>
            ) : null}
          </Offcanvas.Body>
        </Offcanvas>
      </header>
    </>
  );
}
export default Navigation;
